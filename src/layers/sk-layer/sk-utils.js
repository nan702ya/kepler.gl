// Copyright (c) 2021 SK Telecom, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import wktParser from 'wellknown';
import {aggregate} from 'utils/aggregate-utils'
import normalize from '@mapbox/geojson-normalize';
import bbox from '@turf/bbox';
import Processors from '../../processors';
import sido from './p1-100.csv'
import sigungu from './p2-100.csv'
import dong from './p3-100.csv'

export const getValueAggrFunc = (field, aggregation, defaultValue) => {
  return d => {
    return field
      ? d.properties.filteredIndex.length > 0
        ? Math.max(aggregate(
          d.properties.filteredIndex.map(i => {
            return field.valueAccessor(i);
          }),
          aggregation), defaultValue)
        : defaultValue
      : defaultValue;
  };
};

export function getSkLevelPolygonData(code) {
  let polygonData = null;
  if (Number.isInteger(code)) {
    if (code < 100) {
      polygonData = Processors.processCsvData(sido);
    } else if (code < 100000) {
      polygonData = Processors.processCsvData(sigungu);
    } else {
      polygonData = Processors.processCsvData(dong);
    }
  }

  return polygonData;
}

/**
 * Parse raw data to GeoJson feature
 * @param dataContainer
 * @param getFeature
 * @returns {{}}
 */
export function getGeojsonDataMaps(dataContainer, getCode) {
  const acceptableTypes = [
    'Point',
    'MultiPoint',
    'LineString',
    'MultiLineString',
    'Polygon',
    'MultiPolygon',
    'GeometryCollection'
  ];

  const dataToFeature = [];
  const codeToData = {};

  let index = 0;
  const skPolygon = getSkLevelPolygonData(getCode({index}));

  if (!skPolygon) {
    return null;
  }
  
  const codeIndexes = {}
  let code;
  for (index = 0; index < dataContainer.numRows(); index++) {
    code = getCode({index});
    if (!codeIndexes[code]) {
      codeIndexes[code] = [];
    }  
    codeIndexes[code].push({index});
  }

  for (let rawFeature of skPolygon.rows) {
    const feature = parseGeometryFromString(rawFeature[0]);

    if (feature && feature.geometry && acceptableTypes.includes(feature.geometry.type)) {
      const cleaned = {
        ...feature,
        properties: {
          code: rawFeature[1],
          enName: rawFeature[2],
          krName: rawFeature[3],
          filteredIndex: codeIndexes[rawFeature[1]] ?? null
        }
      };

      dataToFeature.push(cleaned);
      codeToData[rawFeature[1]] = dataToFeature.length-1;
    }
  }

  

  return [dataToFeature, codeToData];
}

/**
 * Parse geojson from string
 * @param {String} geoString
 * @returns {null | Object} geojson object or null if failed
 */
export function parseGeometryFromString(geoString) {
  let parsedGeo;

  try {
    parsedGeo = wktParser(geoString);
  } catch (e) {
    return null;
  }
  if (!parsedGeo) {
    return null;
  }

  const normalized = normalize(parsedGeo);

  if (!normalized || !Array.isArray(normalized.features)) {
    // fail to normalize geojson
    return null;
  }

  return normalized.features[0];
}

export function getGeojsonBounds(features = []) {
  // 70 ms for 10,000 polygons
  // here we only pick couple
  const maxCount = 10000;
  const samples = features.length > maxCount ? getSampleData(features, maxCount) : features;

  const nonEmpty = samples.filter(
    d => d && d.geometry && d.geometry.coordinates && d.geometry.coordinates.length
  );

  try {
    return bbox({
      type: 'FeatureCollection',
      features: nonEmpty
    });
  } catch (e) {
    return null;
  }
}