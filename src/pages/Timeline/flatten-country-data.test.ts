import { defaultDatasetContext } from 'src/dataset-context';
import { flattenCountryData } from './flatten-country-data';
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

  test('should flatten country data correctly', () => {
    const result = flattenCountryData(sampleData, ['cases', 'deaths'], defaultDatasetContext);

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
    const result = flattenCountryData(emptyData, ['cases', 'deaths'], defaultDatasetContext);

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
    const result = flattenCountryData(incompleteData, ['cases', 'deaths'], defaultDatasetContext);

    expect(result).toEqual({
      mostRecentTimestamp: 1620000000000,
      timestamps: [1620000000000],
      data: [{ date: 1620000000000, CAN_deaths: 5, USA_cases: 100 }],
    });
  });
});
