import { baseAPI } from '../baseApi'
import {
  AutocompleteOptionType,
  GetDistanceOptimalRequest,
  GetLocationDetailsRequest,
  GetLocationDetailsResponse,
  GetLocationDistanceRequest,
  GetLocationDistanceResponse,
  GetMapAutocompleteRequest,
  GetMapAutocompleteResponse,
  PredictionType,
} from './types'

const TAG = 'MAP'

export const mapApi = baseAPI
  .enhanceEndpoints({
    addTagTypes: [TAG],
  })
  .injectEndpoints({
    endpoints: builder => ({
      getLocationAutocomplete: builder.query<
        AutocompleteOptionType[],
        GetMapAutocompleteRequest
      >({
        query: data => `/map/auto-complete/${data?.query}`,
        providesTags: [{ type: TAG }],
        transformResponse: (response: GetMapAutocompleteResponse) => {
          return response.predictions.map((item: PredictionType) => ({
            key: item.place_id,
            value: item.description,
            place_id: item.place_id,
            location: item.description,
            locationDetails: item.description,
            latitude: undefined,
            longitude: undefined,
          }))
        },
      }),
      getLocationDetails: builder.query<
        AutocompleteOptionType,
        GetLocationDetailsRequest
      >({
        query: data => `/map/place/${data?.placeId}`,
        providesTags: [{ type: TAG }],
        transformResponse: (response: GetLocationDetailsResponse) => {
          return {
            latitude: response.result.geometry?.location?.lat,
            longitude: response.result.geometry?.location?.lng,
            location: response.result.name,
            locationDetails: response.result.formatted_address,
          }
        },
      }),
      getLocationDistance: builder.mutation<
        GetLocationDistanceResponse,
        GetLocationDistanceRequest
      >({
        query: body => ({
          url: '/map/distance',
          method: 'POST',
          body,
        }),
        invalidatesTags: [{ type: TAG }],
      }),
      getDistanceOptimal: builder.mutation<
        { distance: number },
        GetDistanceOptimalRequest
      >({
        query: body => ({
          url: '/map/distance-optimal',
          method: 'POST',
          body,
        }),
      }),
    }),
  })

export const {
  useGetLocationAutocompleteQuery,
  useGetLocationDetailsQuery,
  useLazyGetLocationDetailsQuery,
  useGetLocationDistanceMutation,
  useGetDistanceOptimalMutation,
} = mapApi
