export type Restaurant = {
    id: string,
    types: string[],
    displayName: {
      text: string,
      languageCode: string
    },
    editorialSummary: {
        text: string,
        languageCode: string
    },
    currentOpeningHours: {
        openNow: boolean,
        weekdayDescriptions: string[]
    }
}
