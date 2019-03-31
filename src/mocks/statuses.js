export const goodServiceStatus = {
  $type: 'Tfl.Api.Presentation.Entities.Line, Tfl.Api.Presentation.Entities',
  id: 'bakerloo',
  name: 'Bakerloo',
  modeName: 'tube',
  disruptions: [],
  created: '2019-03-18T20:51:24.157Z',
  modified: '2019-03-18T20:51:24.157Z',
  lineStatuses: [
    {
      $type:
        'Tfl.Api.Presentation.Entities.LineStatus, Tfl.Api.Presentation.Entities',
      id: 0,
      statusSeverity: 10,
      statusSeverityDescription: 'Good Service',
      created: '0001-01-01T00:00:00',
      validityPeriods: [],
    },
  ],
  routeSections: [],
  serviceTypes: [
    {
      $type:
        'Tfl.Api.Presentation.Entities.LineServiceTypeInfo, Tfl.Api.Presentation.Entities',
      name: 'Regular',
      uri: '/Line/Route?ids=Bakerloo&serviceTypes=Regular',
    },
  ],
  crowding: {
    $type:
      'Tfl.Api.Presentation.Entities.Crowding, Tfl.Api.Presentation.Entities',
  },
}
export const severeDelaysStatus = {
  $type: 'Tfl.Api.Presentation.Entities.Line, Tfl.Api.Presentation.Entities',
  id: 'central',
  name: 'Central',
  modeName: 'tube',
  disruptions: [],
  created: '2019-03-18T20:51:24.14Z',
  modified: '2019-03-18T20:51:24.14Z',
  lineStatuses: [
    {
      $type:
        'Tfl.Api.Presentation.Entities.LineStatus, Tfl.Api.Presentation.Entities',
      id: 0,
      statusSeverity: 0,
      statusSeverityDescription: 'Severe Delays',
      created: '0001-01-01T00:00:00',
      validityPeriods: [],
    },
  ],
  routeSections: [],
  serviceTypes: [
    {
      $type:
        'Tfl.Api.Presentation.Entities.LineServiceTypeInfo, Tfl.Api.Presentation.Entities',
      name: 'Regular',
      uri: '/Line/Route?ids=Central&serviceTypes=Regular',
    },
    {
      $type:
        'Tfl.Api.Presentation.Entities.LineServiceTypeInfo, Tfl.Api.Presentation.Entities',
      name: 'Night',
      uri: '/Line/Route?ids=Central&serviceTypes=Night',
    },
  ],
  crowding: {
    $type:
      'Tfl.Api.Presentation.Entities.Crowding, Tfl.Api.Presentation.Entities',
  },
}

export const statuses = [goodServiceStatus, severeDelaysStatus]
export const statusesById = {
  [goodServiceStatus.id]: goodServiceStatus,
  [severeDelaysStatus.id]: severeDelaysStatus,
}
export const statusesAllIds = [goodServiceStatus.id, severeDelaysStatus.id]
