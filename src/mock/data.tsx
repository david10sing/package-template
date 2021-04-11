export const options = [
  {
    label: 'Client',
    value: 'client',
    children: [
      {
        type: 'select',
        options: [
          {
            value: 'clientId',
            label: 'Company ID',
            children: [
              {
                type: 'select',
                placeholder: 'Select function',
                options: [
                  { value: 'value', label: 'Value', children: null },
                  { value: 'substr', label: 'Sub string', children: [{ type: 'input' }] },
                ],
              },
            ],
          },
          { value: 'name', label: 'Client Name' },
        ],
      },
    ],
  },
  {
    label: 'Job',
    options: [
      { value: 'jobId', label: 'Job ID' },
      { value: 'jobTitle', label: 'Job Title' },
    ],
  },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];
