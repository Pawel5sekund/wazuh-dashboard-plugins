export const decoder = [
  {
    name: 'decoder/syslog/0',
    provider: 'native',
    status: 'enable',
    metadata: {
      module: 'syslog',
      title: 'Syslog Decoder event',
      description: 'Syslog header',
      compatibility: 'This decoder has been tested on Wazuh version 4.3',
      author: {
        name: 'Wazuh, Inc.',
        url: 'https://wazuh.com',
        date: '2022/11/08',
      },
      references: [
        'https://www.ietf.org/rfc/rfc3164.txt',
        'https://www.ietf.org/rfc/rfc5424.txt',
      ],
    },
    'parse|event.original': [
      {
        pattern:
          '<event.start/Jun 14 15:16:01> <host.hostname> <TAG/alphanumeric/->[<process.pid>]:<~/ignore/ ><message>',
        description: 'BSD Syslog RFC 3164 standard',
      },
      {
        pattern:
          '<event.start/Jun 14 15:16:01> <host.hostname> <TAG/alphanumeric/->:<~/ignore/ ><message>',
        description: 'BSD Syslog RFC 3164 no pid',
      },
      {
        pattern:
          '<event.start/2018-08-14T14:30:02.203151+02:00> <host.hostname> <TAG/alphanumeric/->[<process.pid>]: <message>',
        description: 'BSD Syslog RFC 3164 standard ISO8601',
      },
      {
        pattern:
          '<event.start/2018-08-14T14:30:02.203151+02:00> <host.hostname> <TAG/alphanumeric/->: <message>',
        description: 'BSD Syslog RFC 3164 no pid ISO8601',
      },
      {
        pattern: '<event.start/SYSLOG> <host.hostname> <message>',
        description: 'RFC3164 example 2 section 5.4',
      },
      {
        pattern:
          '<event.start/%Y %b %d %T> <timezone> <host.hostname> <tmp.host_ip> <TAG/alphanumeric/->[<process.pid>]:<~/ignore/ ><message>',
        description: 'RFC3164 example 4 section 5.4',
      },
    ],
    normalize: [
      {
        map: [
          { 'event.kind': 'event' },
          { 'wazuh.decoders': 'array_append(syslog)' },
          { 'related.hosts': 'array_append($host.hostname)' },
          { 'process.name': 'rename($TAG)' },
          { 'host.ip': 'array_append($tmp.host_ip)' },
        ],
      },
    ],
  },
  {
    name: 'decoder/syslog/1',
    provider: 'native',
    status: 'disable',
    metadata: {
      module: 'syslog2',
      title: 'Syslog Decoder event',
      description: 'Syslog header',
      compatibility: 'This decoder has been tested on Wazuh version 4.3',
      author: {
        name: 'Wazuh, Inc.',
        url: 'https://wazuh.com',
        date: '2022/11/08',
      },
      references: [
        'https://www.ietf.org/rfc/rfc3164.txt',
        'https://www.ietf.org/rfc/rfc5424.txt',
      ],
    },
    'parse|event.original': [
      {
        pattern:
          '<event.start/Jun 14 15:16:01> <host.hostname> <TAG/alphanumeric/->[<process.pid>]:<~/ignore/ ><message>',
        description: 'BSD Syslog RFC 3164 standard',
      },
      {
        pattern:
          '<event.start/Jun 14 15:16:01> <host.hostname> <TAG/alphanumeric/->:<~/ignore/ ><message>',
        description: 'BSD Syslog RFC 3164 no pid',
      },
      {
        pattern:
          '<event.start/2018-08-14T14:30:02.203151+02:00> <host.hostname> <TAG/alphanumeric/->[<process.pid>]: <message>',
        description: 'BSD Syslog RFC 3164 standard ISO8601',
      },
      {
        pattern:
          '<event.start/2018-08-14T14:30:02.203151+02:00> <host.hostname> <TAG/alphanumeric/->: <message>',
        description: 'BSD Syslog RFC 3164 no pid ISO8601',
      },
      {
        pattern: '<event.start/SYSLOG> <host.hostname> <message>',
        description: 'RFC3164 example 2 section 5.4',
      },
      {
        pattern:
          '<event.start/%Y %b %d %T> <timezone> <host.hostname> <tmp.host_ip> <TAG/alphanumeric/->[<process.pid>]:<~/ignore/ ><message>',
        description: 'RFC3164 example 4 section 5.4',
      },
    ],
    normalize: [
      {
        map: [
          { 'event.kind': 'event' },
          { 'wazuh.decoders': 'array_append(syslog)' },
          { 'related.hosts': 'array_append($host.hostname)' },
          { 'process.name': 'rename($TAG)' },
          { 'host.ip': 'array_append($tmp.host_ip)' },
        ],
      },
    ],
  },
  {
    name: 'decoder/syslog/2',
    provider: 'native',
    status: 'disable',
    metadata: {
      module: 'syslog3',
      title: 'Syslog Decoder event',
      description: 'Syslog header',
      compatibility: 'This decoder has been tested on Wazuh version 4.3',
      author: {
        name: 'Wazuh, Inc.',
        url: 'https://wazuh.com',
        date: '2022/11/08',
      },
      references: [
        'https://www.ietf.org/rfc/rfc3164.txt',
        'https://www.ietf.org/rfc/rfc5424.txt',
      ],
    },
    'parse|event.original': [
      {
        pattern:
          '<event.start/Jun 14 15:16:01> <host.hostname> <TAG/alphanumeric/->[<process.pid>]:<~/ignore/ ><message>',
        description: 'BSD Syslog RFC 3164 standard',
      },
      {
        pattern:
          '<event.start/Jun 14 15:16:01> <host.hostname> <TAG/alphanumeric/->:<~/ignore/ ><message>',
        description: 'BSD Syslog RFC 3164 no pid',
      },
      {
        pattern:
          '<event.start/2018-08-14T14:30:02.203151+02:00> <host.hostname> <TAG/alphanumeric/->[<process.pid>]: <message>',
        description: 'BSD Syslog RFC 3164 standard ISO8601',
      },
      {
        pattern:
          '<event.start/2018-08-14T14:30:02.203151+02:00> <host.hostname> <TAG/alphanumeric/->: <message>',
        description: 'BSD Syslog RFC 3164 no pid ISO8601',
      },
      {
        pattern: '<event.start/SYSLOG> <host.hostname> <message>',
        description: 'RFC3164 example 2 section 5.4',
      },
      {
        pattern:
          '<event.start/%Y %b %d %T> <timezone> <host.hostname> <tmp.host_ip> <TAG/alphanumeric/->[<process.pid>]:<~/ignore/ ><message>',
        description: 'RFC3164 example 4 section 5.4',
      },
    ],
    normalize: [
      {
        map: [
          { 'event.kind': 'event' },
          { 'wazuh.decoders': 'array_append(syslog)' },
          { 'related.hosts': 'array_append($host.hostname)' },
          { 'process.name': 'rename($TAG)' },
          { 'host.ip': 'array_append($tmp.host_ip)' },
        ],
      },
    ],
  },
  {
    name: 'decoder/syslog/0',
    provider: 'native',
    status: 'disable',
    metadata: {
      module: 'syslog4',
      title: 'Syslog Decoder event',
      description: 'Syslog header',
      compatibility: 'This decoder has been tested on Wazuh version 4.3',
      author: {
        name: 'Wazuh, Inc.',
        url: 'https://wazuh.com',
        date: '2022/11/08',
      },
      references: [
        'https://www.ietf.org/rfc/rfc3164.txt',
        'https://www.ietf.org/rfc/rfc5424.txt',
      ],
    },
    'parse|event.original': [
      {
        pattern:
          '<event.start/Jun 14 15:16:01> <host.hostname> <TAG/alphanumeric/->[<process.pid>]:<~/ignore/ ><message>',
        description: 'BSD Syslog RFC 3164 standard',
      },
      {
        pattern:
          '<event.start/Jun 14 15:16:01> <host.hostname> <TAG/alphanumeric/->:<~/ignore/ ><message>',
        description: 'BSD Syslog RFC 3164 no pid',
      },
      {
        pattern:
          '<event.start/2018-08-14T14:30:02.203151+02:00> <host.hostname> <TAG/alphanumeric/->[<process.pid>]: <message>',
        description: 'BSD Syslog RFC 3164 standard ISO8601',
      },
      {
        pattern:
          '<event.start/2018-08-14T14:30:02.203151+02:00> <host.hostname> <TAG/alphanumeric/->: <message>',
        description: 'BSD Syslog RFC 3164 no pid ISO8601',
      },
      {
        pattern: '<event.start/SYSLOG> <host.hostname> <message>',
        description: 'RFC3164 example 2 section 5.4',
      },
      {
        pattern:
          '<event.start/%Y %b %d %T> <timezone> <host.hostname> <tmp.host_ip> <TAG/alphanumeric/->[<process.pid>]:<~/ignore/ ><message>',
        description: 'RFC3164 example 4 section 5.4',
      },
    ],
    normalize: [
      {
        map: [
          { 'event.kind': 'event' },
          { 'wazuh.decoders': 'array_append(syslog)' },
          { 'related.hosts': 'array_append($host.hostname)' },
          { 'process.name': 'rename($TAG)' },
          { 'host.ip': 'array_append($tmp.host_ip)' },
        ],
      },
    ],
  },
  {
    name: 'decoder/syslog/1',
    provider: 'native',
    status: 'disable',
    metadata: {
      module: 'syslog5',
      title: 'Syslog Decoder event',
      description: 'Syslog header',
      compatibility: 'This decoder has been tested on Wazuh version 4.3',
      author: {
        name: 'Wazuh, Inc.',
        url: 'https://wazuh.com',
        date: '2022/11/08',
      },
      references: [
        'https://www.ietf.org/rfc/rfc3164.txt',
        'https://www.ietf.org/rfc/rfc5424.txt',
      ],
    },
    'parse|event.original': [
      {
        pattern:
          '<event.start/Jun 14 15:16:01> <host.hostname> <TAG/alphanumeric/->[<process.pid>]:<~/ignore/ ><message>',
        description: 'BSD Syslog RFC 3164 standard',
      },
      {
        pattern:
          '<event.start/Jun 14 15:16:01> <host.hostname> <TAG/alphanumeric/->:<~/ignore/ ><message>',
        description: 'BSD Syslog RFC 3164 no pid',
      },
      {
        pattern:
          '<event.start/2018-08-14T14:30:02.203151+02:00> <host.hostname> <TAG/alphanumeric/->[<process.pid>]: <message>',
        description: 'BSD Syslog RFC 3164 standard ISO8601',
      },
      {
        pattern:
          '<event.start/2018-08-14T14:30:02.203151+02:00> <host.hostname> <TAG/alphanumeric/->: <message>',
        description: 'BSD Syslog RFC 3164 no pid ISO8601',
      },
      {
        pattern: '<event.start/SYSLOG> <host.hostname> <message>',
        description: 'RFC3164 example 2 section 5.4',
      },
      {
        pattern:
          '<event.start/%Y %b %d %T> <timezone> <host.hostname> <tmp.host_ip> <TAG/alphanumeric/->[<process.pid>]:<~/ignore/ ><message>',
        description: 'RFC3164 example 4 section 5.4',
      },
    ],
    normalize: [
      {
        map: [
          { 'event.kind': 'event' },
          { 'wazuh.decoders': 'array_append(syslog)' },
          { 'related.hosts': 'array_append($host.hostname)' },
          { 'process.name': 'rename($TAG)' },
          { 'host.ip': 'array_append($tmp.host_ip)' },
        ],
      },
    ],
  },
  {
    name: 'decoder/syslog/2',
    provider: 'native',
    status: 'draft',
    metadata: {
      module: 'syslog6',
      title: 'Syslog Decoder event',
      description: 'Syslog header',
      compatibility: 'This decoder has been tested on Wazuh version 4.3',
      author: {
        name: 'Wazuh, Inc.',
        url: 'https://wazuh.com',
        date: '2022/11/08',
      },
      references: [
        'https://www.ietf.org/rfc/rfc3164.txt',
        'https://www.ietf.org/rfc/rfc5424.txt',
      ],
    },
    'parse|event.original': [
      {
        pattern:
          '<event.start/Jun 14 15:16:01> <host.hostname> <TAG/alphanumeric/->[<process.pid>]:<~/ignore/ ><message>',
        description: 'BSD Syslog RFC 3164 standard',
      },
      {
        pattern:
          '<event.start/Jun 14 15:16:01> <host.hostname> <TAG/alphanumeric/->:<~/ignore/ ><message>',
        description: 'BSD Syslog RFC 3164 no pid',
      },
      {
        pattern:
          '<event.start/2018-08-14T14:30:02.203151+02:00> <host.hostname> <TAG/alphanumeric/->[<process.pid>]: <message>',
        description: 'BSD Syslog RFC 3164 standard ISO8601',
      },
      {
        pattern:
          '<event.start/2018-08-14T14:30:02.203151+02:00> <host.hostname> <TAG/alphanumeric/->: <message>',
        description: 'BSD Syslog RFC 3164 no pid ISO8601',
      },
      {
        pattern: '<event.start/SYSLOG> <host.hostname> <message>',
        description: 'RFC3164 example 2 section 5.4',
      },
      {
        pattern:
          '<event.start/%Y %b %d %T> <timezone> <host.hostname> <tmp.host_ip> <TAG/alphanumeric/->[<process.pid>]:<~/ignore/ ><message>',
        description: 'RFC3164 example 4 section 5.4',
      },
    ],
    normalize: [
      {
        map: [
          { 'event.kind': 'event' },
          { 'wazuh.decoders': 'array_append(syslog)' },
          { 'related.hosts': 'array_append($host.hostname)' },
          { 'process.name': 'rename($TAG)' },
          { 'host.ip': 'array_append($tmp.host_ip)' },
        ],
      },
    ],
  },
  {
    name: 'decoder/syslog/0',
    provider: 'custom',
    status: 'enable',
    metadata: {
      module: 'syslog',
      title: 'Syslog Decoder event',
      description: 'Syslog header',
      compatibility: 'This decoder has been tested on Wazuh version 4.3',
      author: {
        name: 'Wazuh, Inc.',
        url: 'https://wazuh.com',
        date: '2022/11/08',
      },
      references: [
        'https://www.ietf.org/rfc/rfc3164.txt',
        'https://www.ietf.org/rfc/rfc5424.txt',
      ],
    },
    'parse|event.original': [
      {
        pattern:
          '<event.start/Jun 14 15:16:01> <host.hostname> <TAG/alphanumeric/->[<process.pid>]:<~/ignore/ ><message>',
        description: 'BSD Syslog RFC 3164 standard',
      },
      {
        pattern:
          '<event.start/Jun 14 15:16:01> <host.hostname> <TAG/alphanumeric/->:<~/ignore/ ><message>',
        description: 'BSD Syslog RFC 3164 no pid',
      },
      {
        pattern:
          '<event.start/2018-08-14T14:30:02.203151+02:00> <host.hostname> <TAG/alphanumeric/->[<process.pid>]: <message>',
        description: 'BSD Syslog RFC 3164 standard ISO8601',
      },
      {
        pattern:
          '<event.start/2018-08-14T14:30:02.203151+02:00> <host.hostname> <TAG/alphanumeric/->: <message>',
        description: 'BSD Syslog RFC 3164 no pid ISO8601',
      },
      {
        pattern: '<event.start/SYSLOG> <host.hostname> <message>',
        description: 'RFC3164 example 2 section 5.4',
      },
      {
        pattern:
          '<event.start/%Y %b %d %T> <timezone> <host.hostname> <tmp.host_ip> <TAG/alphanumeric/->[<process.pid>]:<~/ignore/ ><message>',
        description: 'RFC3164 example 4 section 5.4',
      },
    ],
    normalize: [
      {
        map: [
          { 'event.kind': 'event' },
          { 'wazuh.decoders': 'array_append(syslog)' },
          { 'related.hosts': 'array_append($host.hostname)' },
          { 'process.name': 'rename($TAG)' },
          { 'host.ip': 'array_append($tmp.host_ip)' },
        ],
      },
    ],
  },
  {
    name: 'decoder/syslog/1',
    provider: 'custom',
    status: 'enable',
    metadata: {
      module: 'syslog',
      title: 'Syslog Decoder event',
      description: 'Syslog header',
      compatibility: 'This decoder has been tested on Wazuh version 4.3',
      author: {
        name: 'Wazuh, Inc.',
        url: 'https://wazuh.com',
        date: '2022/11/08',
      },
      references: [
        'https://www.ietf.org/rfc/rfc3164.txt',
        'https://www.ietf.org/rfc/rfc5424.txt',
      ],
    },
    'parse|event.original': [
      {
        pattern:
          '<event.start/Jun 14 15:16:01> <host.hostname> <TAG/alphanumeric/->[<process.pid>]:<~/ignore/ ><message>',
        description: 'BSD Syslog RFC 3164 standard',
      },
      {
        pattern:
          '<event.start/Jun 14 15:16:01> <host.hostname> <TAG/alphanumeric/->:<~/ignore/ ><message>',
        description: 'BSD Syslog RFC 3164 no pid',
      },
      {
        pattern:
          '<event.start/2018-08-14T14:30:02.203151+02:00> <host.hostname> <TAG/alphanumeric/->[<process.pid>]: <message>',
        description: 'BSD Syslog RFC 3164 standard ISO8601',
      },
      {
        pattern:
          '<event.start/2018-08-14T14:30:02.203151+02:00> <host.hostname> <TAG/alphanumeric/->: <message>',
        description: 'BSD Syslog RFC 3164 no pid ISO8601',
      },
      {
        pattern: '<event.start/SYSLOG> <host.hostname> <message>',
        description: 'RFC3164 example 2 section 5.4',
      },
      {
        pattern:
          '<event.start/%Y %b %d %T> <timezone> <host.hostname> <tmp.host_ip> <TAG/alphanumeric/->[<process.pid>]:<~/ignore/ ><message>',
        description: 'RFC3164 example 4 section 5.4',
      },
    ],
    normalize: [
      {
        map: [
          { 'event.kind': 'event' },
          { 'wazuh.decoders': 'array_append(syslog)' },
          { 'related.hosts': 'array_append($host.hostname)' },
          { 'process.name': 'rename($TAG)' },
          { 'host.ip': 'array_append($tmp.host_ip)' },
        ],
      },
    ],
  },
  {
    name: 'decoder/syslog/2',
    provider: 'custom',
    status: 'enable',
    metadata: {
      module: 'syslog',
      title: 'Syslog Decoder event',
      description: 'Syslog header',
      compatibility: 'This decoder has been tested on Wazuh version 4.3',
      author: {
        name: 'Wazuh, Inc.',
        url: 'https://wazuh.com',
        date: '2022/11/08',
      },
      references: [
        'https://www.ietf.org/rfc/rfc3164.txt',
        'https://www.ietf.org/rfc/rfc5424.txt',
      ],
    },
    'parse|event.original': [
      {
        pattern:
          '<event.start/Jun 14 15:16:01> <host.hostname> <TAG/alphanumeric/->[<process.pid>]:<~/ignore/ ><message>',
        description: 'BSD Syslog RFC 3164 standard',
      },
      {
        pattern:
          '<event.start/Jun 14 15:16:01> <host.hostname> <TAG/alphanumeric/->:<~/ignore/ ><message>',
        description: 'BSD Syslog RFC 3164 no pid',
      },
      {
        pattern:
          '<event.start/2018-08-14T14:30:02.203151+02:00> <host.hostname> <TAG/alphanumeric/->[<process.pid>]: <message>',
        description: 'BSD Syslog RFC 3164 standard ISO8601',
      },
      {
        pattern:
          '<event.start/2018-08-14T14:30:02.203151+02:00> <host.hostname> <TAG/alphanumeric/->: <message>',
        description: 'BSD Syslog RFC 3164 no pid ISO8601',
      },
      {
        pattern: '<event.start/SYSLOG> <host.hostname> <message>',
        description: 'RFC3164 example 2 section 5.4',
      },
      {
        pattern:
          '<event.start/%Y %b %d %T> <timezone> <host.hostname> <tmp.host_ip> <TAG/alphanumeric/->[<process.pid>]:<~/ignore/ ><message>',
        description: 'RFC3164 example 4 section 5.4',
      },
    ],
    normalize: [
      {
        map: [
          { 'event.kind': 'event' },
          { 'wazuh.decoders': 'array_append(syslog)' },
          { 'related.hosts': 'array_append($host.hostname)' },
          { 'process.name': 'rename($TAG)' },
          { 'host.ip': 'array_append($tmp.host_ip)' },
        ],
      },
    ],
  },
  {
    name: 'decoder/syslog/0',
    provider: 'custom',
    status: 'draft',
    metadata: {
      module: 'syslog',
      title: 'Syslog Decoder event',
      description: 'Syslog header',
      compatibility: 'This decoder has been tested on Wazuh version 4.3',
      author: {
        name: 'Wazuh, Inc.',
        url: 'https://wazuh.com',
        date: '2022/11/08',
      },
      references: [
        'https://www.ietf.org/rfc/rfc3164.txt',
        'https://www.ietf.org/rfc/rfc5424.txt',
      ],
    },
    'parse|event.original': [
      {
        pattern:
          '<event.start/Jun 14 15:16:01> <host.hostname> <TAG/alphanumeric/->[<process.pid>]:<~/ignore/ ><message>',
        description: 'BSD Syslog RFC 3164 standard',
      },
      {
        pattern:
          '<event.start/Jun 14 15:16:01> <host.hostname> <TAG/alphanumeric/->:<~/ignore/ ><message>',
        description: 'BSD Syslog RFC 3164 no pid',
      },
      {
        pattern:
          '<event.start/2018-08-14T14:30:02.203151+02:00> <host.hostname> <TAG/alphanumeric/->[<process.pid>]: <message>',
        description: 'BSD Syslog RFC 3164 standard ISO8601',
      },
      {
        pattern:
          '<event.start/2018-08-14T14:30:02.203151+02:00> <host.hostname> <TAG/alphanumeric/->: <message>',
        description: 'BSD Syslog RFC 3164 no pid ISO8601',
      },
      {
        pattern: '<event.start/SYSLOG> <host.hostname> <message>',
        description: 'RFC3164 example 2 section 5.4',
      },
      {
        pattern:
          '<event.start/%Y %b %d %T> <timezone> <host.hostname> <tmp.host_ip> <TAG/alphanumeric/->[<process.pid>]:<~/ignore/ ><message>',
        description: 'RFC3164 example 4 section 5.4',
      },
    ],
    normalize: [
      {
        map: [
          { 'event.kind': 'event' },
          { 'wazuh.decoders': 'array_append(syslog)' },
          { 'related.hosts': 'array_append($host.hostname)' },
          { 'process.name': 'rename($TAG)' },
          { 'host.ip': 'array_append($tmp.host_ip)' },
        ],
      },
    ],
  },
  {
    name: 'decoder/syslog/1',
    provider: 'custom',
    status: 'draft',
    metadata: {
      module: 'syslog',
      title: 'Syslog Decoder event',
      description: 'Syslog header',
      compatibility: 'This decoder has been tested on Wazuh version 4.3',
      author: {
        name: 'Wazuh, Inc.',
        url: 'https://wazuh.com',
        date: '2022/11/08',
      },
      references: [
        'https://www.ietf.org/rfc/rfc3164.txt',
        'https://www.ietf.org/rfc/rfc5424.txt',
      ],
    },
    'parse|event.original': [
      {
        pattern:
          '<event.start/Jun 14 15:16:01> <host.hostname> <TAG/alphanumeric/->[<process.pid>]:<~/ignore/ ><message>',
        description: 'BSD Syslog RFC 3164 standard',
      },
      {
        pattern:
          '<event.start/Jun 14 15:16:01> <host.hostname> <TAG/alphanumeric/->:<~/ignore/ ><message>',
        description: 'BSD Syslog RFC 3164 no pid',
      },
      {
        pattern:
          '<event.start/2018-08-14T14:30:02.203151+02:00> <host.hostname> <TAG/alphanumeric/->[<process.pid>]: <message>',
        description: 'BSD Syslog RFC 3164 standard ISO8601',
      },
      {
        pattern:
          '<event.start/2018-08-14T14:30:02.203151+02:00> <host.hostname> <TAG/alphanumeric/->: <message>',
        description: 'BSD Syslog RFC 3164 no pid ISO8601',
      },
      {
        pattern: '<event.start/SYSLOG> <host.hostname> <message>',
        description: 'RFC3164 example 2 section 5.4',
      },
      {
        pattern:
          '<event.start/%Y %b %d %T> <timezone> <host.hostname> <tmp.host_ip> <TAG/alphanumeric/->[<process.pid>]:<~/ignore/ ><message>',
        description: 'RFC3164 example 4 section 5.4',
      },
    ],
    normalize: [
      {
        map: [
          { 'event.kind': 'event' },
          { 'wazuh.decoders': 'array_append(syslog)' },
          { 'related.hosts': 'array_append($host.hostname)' },
          { 'process.name': 'rename($TAG)' },
          { 'host.ip': 'array_append($tmp.host_ip)' },
        ],
      },
    ],
  },
  {
    name: 'decoder/syslog/2',
    provider: 'custom',
    status: 'draft',
    metadata: {
      module: 'syslog',
      title: 'Syslog Decoder event',
      description: 'Syslog header',
      compatibility: 'This decoder has been tested on Wazuh version 4.3',
      author: {
        name: 'Wazuh, Inc.',
        url: 'https://wazuh.com',
        date: '2022/11/08',
      },
      references: [
        'https://www.ietf.org/rfc/rfc3164.txt',
        'https://www.ietf.org/rfc/rfc5424.txt',
      ],
    },
    'parse|event.original': [
      {
        pattern:
          '<event.start/Jun 14 15:16:01> <host.hostname> <TAG/alphanumeric/->[<process.pid>]:<~/ignore/ ><message>',
        description: 'BSD Syslog RFC 3164 standard',
      },
      {
        pattern:
          '<event.start/Jun 14 15:16:01> <host.hostname> <TAG/alphanumeric/->:<~/ignore/ ><message>',
        description: 'BSD Syslog RFC 3164 no pid',
      },
      {
        pattern:
          '<event.start/2018-08-14T14:30:02.203151+02:00> <host.hostname> <TAG/alphanumeric/->[<process.pid>]: <message>',
        description: 'BSD Syslog RFC 3164 standard ISO8601',
      },
      {
        pattern:
          '<event.start/2018-08-14T14:30:02.203151+02:00> <host.hostname> <TAG/alphanumeric/->: <message>',
        description: 'BSD Syslog RFC 3164 no pid ISO8601',
      },
      {
        pattern: '<event.start/SYSLOG> <host.hostname> <message>',
        description: 'RFC3164 example 2 section 5.4',
      },
      {
        pattern:
          '<event.start/%Y %b %d %T> <timezone> <host.hostname> <tmp.host_ip> <TAG/alphanumeric/->[<process.pid>]:<~/ignore/ ><message>',
        description: 'RFC3164 example 4 section 5.4',
      },
    ],
    normalize: [
      {
        map: [
          { 'event.kind': 'event' },
          { 'wazuh.decoders': 'array_append(syslog)' },
          { 'related.hosts': 'array_append($host.hostname)' },
          { 'process.name': 'rename($TAG)' },
          { 'host.ip': 'array_append($tmp.host_ip)' },
        ],
      },
    ],
  },
];
