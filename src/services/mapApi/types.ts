export type GetMapAutocompleteRequest = {
  query?: string
}

export type GetMapAutocompleteResponse = {
  predictions: PredictionType[]
  status?: string
}

export type PredictionType = {
  description?: string
  matched_substrings?: MatchedSubstringType[]
  place_id?: string
  reference?: string
  structured_formatting?: {
    main_text?: string
    main_text_matched_substrings?: MatchedSubstringType[]
    secondary_text?: string
  }
  terms?: TermType[]
  type?: Array<string>
}

export type MatchedSubstringType = {
  length?: number
  offset?: number
}

export type TermType = {
  offset?: number
  value?: string
}

export type GetLocationDetailsResponse = {
  html_attributions: any
  result: LocationDetailsType
  status: string
}

export type GetLocationDetailsRequest = {
  placeId?: string
}

export type LocationDetailsType = {
  formatted_address?: string
  geometry?: {
    location?: GeometryType
    viewport?: {
      northeast?: GeometryType
      southwest?: GeometryType
    }
  }
  name?: string
}

export type GeometryType = {
  lat: number
  lng: number
}

export type GoogleDistanceType = {
  distance: {
    text: string
    value: number
  }
  duration: {
    text: string
    value: number
  }
  status: string
}

export type GetLocationDistanceRequest = {
  origin: string
  destination: string
}

export type GetLocationDistanceResponse = {
  destination_addresses: string[]
  origin_addresses: string[]
  rows: {
    elements: GoogleDistanceType[]
  }[]
  status: string
}

export type AutocompleteOptionType = {
  key?: string
  value?: string
  place_id?: string
  location?: string
  locationDetails?: string
  latitude?: number
  longitude?: number
}

export type GetDistanceOptimalRequest = {
  origin: string
  destination: string
  pickupDate: string | Date
  vehicleCategoryId: number
}
