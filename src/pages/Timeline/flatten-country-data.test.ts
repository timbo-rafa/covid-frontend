import { defaultDatasetContext } from 'src/dataset-context';
import { flattenTimelineData } from './flatten-country-data';
import { TimelineApiDTO } from './use-timeline-data.hook';

describe('flattenCountryData', () => {
  const sampleData: TimelineApiDTO = {
    dataDictionary: {
      1620000000000: {
        USA: [{ cases: 100, deaths: 10 }],
        CAN: [{ cases: 50, deaths: 5 }],
      },
      1620100000000: {
        USA: [{ cases: 150, deaths: 15 }],
        CAN: [{ cases: 75, deaths: 7 }],
      },
    },
    mostRecentTimestamp: 1620100000000,
    timestamps: [1620000000000, 1620100000000],
  };

  const selectedColumnNames = ['cases', 'deaths'];
  const selectedKeyColumnValues = ['USA', 'CAN'];

  test('should flatten country data correctly', () => {
    const result = flattenTimelineData(sampleData, selectedColumnNames, selectedKeyColumnValues, defaultDatasetContext);

    expect(result).toEqual({
      mostRecentTimestamp: 1620100000000,
      timestamps: [1620000000000, 1620100000000],
      data: [
        { date: 1620000000000, USA_cases: 100, USA_deaths: 10, CAN_cases: 50, CAN_deaths: 5 },
        { date: 1620100000000, USA_cases: 150, USA_deaths: 15, CAN_cases: 75, CAN_deaths: 7 },
      ],
    });
  });

  test('should handle empty data dictionary', () => {
    const emptyData: TimelineApiDTO = {
      dataDictionary: {},
      mostRecentTimestamp: null,
      timestamps: [],
    };
    const result = flattenTimelineData(emptyData, selectedColumnNames, selectedKeyColumnValues, defaultDatasetContext);

    expect(result).toEqual({
      mostRecentTimestamp: null,
      timestamps: [],
      data: [],
    });
  });

  test('should handle missing columns in selected data', () => {
    const incompleteData: TimelineApiDTO = {
      dataDictionary: {
        1620000000000: {
          USA: [{ cases: 100 }],
          CAN: [{ deaths: 5 }],
        },
      },
      mostRecentTimestamp: 1620000000000,
      timestamps: [1620000000000],
    };
    const result = flattenTimelineData(incompleteData, selectedColumnNames, selectedKeyColumnValues, defaultDatasetContext);

    expect(result).toEqual({
      mostRecentTimestamp: 1620000000000,
      timestamps: [1620000000000],
      data: [{ date: 1620000000000, CAN_cases: null, CAN_deaths: 5, USA_cases: 100, USA_deaths: null }],
    });
  });

  test('should handle missing key values in dictionary', () => {
    const incompleteData: TimelineApiDTO = {
      dataDictionary: {
        1620000000000: {
          CAN: [{ deaths: 5 }],
        },
      },
      mostRecentTimestamp: 1620000000000,
      timestamps: [1620000000000],
    };
    const result = flattenTimelineData(incompleteData, selectedColumnNames, selectedKeyColumnValues, defaultDatasetContext);

    expect(result).toEqual({
      mostRecentTimestamp: 1620000000000,
      timestamps: [1620000000000],
      data: [{ date: 1620000000000, CAN_cases: null, CAN_deaths: 5, USA_cases: null, USA_deaths: null }],
    });
  });

  test('should handle no data', () => {
    const incompleteData: TimelineApiDTO = {
      dataDictionary: {
        1620000000000: {
          USA: [],
          CAN: [{ deaths: 5 }],
        },
      },
      mostRecentTimestamp: 1620000000000,
      timestamps: [1620000000000],
    };
    const result = flattenTimelineData(incompleteData, selectedColumnNames, selectedKeyColumnValues, defaultDatasetContext);

    expect(result).toEqual({
      mostRecentTimestamp: 1620000000000,
      timestamps: [1620000000000],
      data: [{ date: 1620000000000, CAN_cases: null, CAN_deaths: 5, USA_cases: null, USA_deaths: null }],
    });
  });
});
