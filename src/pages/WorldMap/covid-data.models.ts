import { CountryIso3 } from "@geo-utils"

export type CountryCovidDataType = {
  id: number;
  isoCode: string; // CountryIso3;
  covidData: CovidDataType[]
}

export type CovidDataType = {
  newCases: number | null
  //countryId: number;
  //countryIsoCode: CountryIso3;
  // date: string//Date
  // totalCases: bigint | null
  // newCasesSmoothed: number | null
  // totalDeaths: number | null
  // newDeaths: number | null
  // newDeathsSmoothed: number | null
  // totalCasesPerMillion: number | null
  // newCasesPerMillion: number | null
  // newCasesSmoothedPerMillion: number | null
  // totalDeathsPerMillion: number | null
  // newDeathsPerMillion: number | null
  // newDeathsSmoothedPerMillion: number | null
  // reproductionRate: number | null
  // icuPatients: number | null
  // icuPatientsPerMillion: number | null
  // hospPatients: number | null
  // hospPatientsPerMillion: number | null
  // weeklyIcuAdmissions: number | null
  // weeklyIcuAdmissionsPerMillion: number | null
  // weeklyHospAdmissions: number | null
  // weeklyHospAdmissionsPerMillion: number | null
  // totalTests: bigint | null
  // newTests: number | null
  // totalTestsPerThousand: number | null
  // newTestsPerThousand: number | null
  // newTestsSmoothed: number | null
  // newTestsSmoothedPerThousand: number | null
  // positiveRate: number | null
  // testsPerCase: number | null
  // testsUnits: string | null
  // totalVaccinations: bigint | null
  // peopleVaccinated: bigint | null
  // peopleFullyVaccinated: bigint | null
  // totalBoosters: bigint | null
  // newVaccinations: number | null
  // newVaccinationsSmoothed: number | null
  // totalVaccinationsPerHundred: number | null
  // peopleVaccinatedPerHundred: number | null
  // peopleFullyVaccinatedPerHundred: number | null
  // totalBoostersPerHundred: number | null
  // newVaccinationsSmoothedPerMillion: number | null
  // newPeopleVaccinatedSmoothed: number | null
  // newPeopleVaccinatedSmoothedPerHundred: number | null
  // stringencyIndex: number | null
  // populationDensity: number | null
  // medianAge: number | null
  // aged65Older: number | null
  // aged70Older: number | null
  // gdpPerCapita: number | null
  // extremePoverty: number | null
  // cardiovascDeathRate: number | null
  // diabetesPrevalence: number | null
  // femaleSmokers: number | null
  // maleSmokers: number | null
  // handwashingFacilities: number | null
  // hospitalBedsPerThousand: number | null
  // lifeExpectancy: number | null
  // humanDevelopmentIndex: number | null
  // population: bigint | null
  // excessMortalityCumulativeAbsolute: number | null
  // excessMortalityCumulative: number | null
  // excessMortality: number | null
  // excessMortalityCumulativePerMillion: number | null
}