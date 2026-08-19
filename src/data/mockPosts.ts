import { RedditPost, SubredditAnalysis } from '../types';
import { fetchAnalysisFromSupabase, saveAnalysisToSupabase } from '../services/supabaseService';

export const technologyMockPosts: RedditPost[] = [
  {
    id: 'post-1',
    title: 'The future of AI is changing faster than anyone expected',
    author: 'tech_enthusiast99',
    score: 2450,
    numComments: 342,
    sentiment: 'Positive',
    sentimentScore: 4,
    createdUtc: '2 hours ago',
    permalink: 'https://reddit.com/r/technology/comments/tech01',
    flair: 'Artificial Intelligence',
    sentimentExplanation: 'Positive sentiment driven by terms "future", "changing faster", "expected progress".'
  },
  {
    id: 'post-2',
    title: 'This new technology announcement is surprisingly impressive',
    author: 'quantum_coder',
    score: 1870,
    numComments: 218,
    sentiment: 'Positive',
    sentimentScore: 3,
    createdUtc: '3 hours ago',
    permalink: 'https://reddit.com/r/technology/comments/tech02',
    flair: 'Hardware',
    sentimentExplanation: 'Positive terms "surprisingly impressive" and breakthrough reception.'
  },
  {
    id: 'post-3',
    title: 'Developers discuss the latest changes in the tech industry',
    author: 'dev_lead_dan',
    score: 1540,
    numComments: 156,
    sentiment: 'Neutral',
    sentimentScore: 0,
    createdUtc: '4 hours ago',
    permalink: 'https://reddit.com/r/technology/comments/tech03',
    flair: 'Discussion',
    sentimentExplanation: 'Objective, observational reporting without overt sentiment polarity.'
  },
  {
    id: 'post-4',
    title: 'Users report serious problems after the latest update',
    author: 'sysadmin_daily',
    score: 1320,
    numComments: 291,
    sentiment: 'Negative',
    sentimentScore: -3,
    createdUtc: '5 hours ago',
    permalink: 'https://reddit.com/r/technology/comments/tech04',
    flair: 'Software',
    sentimentExplanation: 'Negative valence highlighted by "serious problems" and disruption reports.'
  },
  {
    id: 'post-5',
    title: 'Solar battery breakthroughs promise affordable renewable storage',
    author: 'green_future',
    score: 3120,
    numComments: 412,
    sentiment: 'Positive',
    sentimentScore: 4,
    createdUtc: '5 hours ago',
    permalink: 'https://reddit.com/r/technology/comments/tech05',
    flair: 'Energy',
    sentimentExplanation: 'High positivity associated with "breakthroughs", "promise", "affordable".'
  },
  {
    id: 'post-6',
    title: 'Open source silicon initiative reaches milestone production run',
    author: 'hw_architect',
    score: 980,
    numComments: 84,
    sentiment: 'Positive',
    sentimentScore: 2,
    createdUtc: '6 hours ago',
    permalink: 'https://reddit.com/r/technology/comments/tech06',
    flair: 'Open Source',
    sentimentExplanation: 'Constructive optimism surrounding milestone achievement.'
  },
  {
    id: 'post-7',
    title: 'FCC proposes revised regulations on satellite broadband spectrum',
    author: 'policy_wonk',
    score: 640,
    numComments: 92,
    sentiment: 'Neutral',
    sentimentScore: 0,
    createdUtc: '7 hours ago',
    permalink: 'https://reddit.com/r/technology/comments/tech07',
    flair: 'Policy & Law',
    sentimentExplanation: 'Factual regulatory documentation without emotional language.'
  },
  {
    id: 'post-8',
    title: 'Cybersecurity incident exposes vulnerability in legacy enterprise routers',
    author: 'infosec_guard',
    score: 1890,
    numComments: 230,
    sentiment: 'Negative',
    sentimentScore: -4,
    createdUtc: '8 hours ago',
    permalink: 'https://reddit.com/r/technology/comments/tech08',
    flair: 'Security',
    sentimentExplanation: 'High risk and hazard terms: "cybersecurity incident", "exposes vulnerability".'
  },
  {
    id: 'post-9',
    title: 'EU passes digital interoperability standard for messaging apps',
    author: 'euro_tech',
    score: 2150,
    numComments: 310,
    sentiment: 'Neutral',
    sentimentScore: 1,
    createdUtc: '9 hours ago',
    permalink: 'https://reddit.com/r/technology/comments/tech09',
    flair: 'Policy & Law',
    sentimentExplanation: 'Informational legal update with mild consumer-friendly inclination.'
  },
  {
    id: 'post-10',
    title: 'Subscription pricing increase sparks user backlash across platforms',
    author: 'consumer_voice',
    score: 2780,
    numComments: 580,
    sentiment: 'Negative',
    sentimentScore: -3,
    createdUtc: '10 hours ago',
    permalink: 'https://reddit.com/r/technology/comments/tech10',
    flair: 'Business',
    sentimentExplanation: 'Frustration conveyed by "pricing increase", "backlash".'
  },
  {
    id: 'post-11',
    title: 'Next-gen display technology achieves 40% reduction in power consumption',
    author: 'screen_guru',
    score: 1650,
    numComments: 142,
    sentiment: 'Positive',
    sentimentScore: 3,
    createdUtc: '11 hours ago',
    permalink: 'https://reddit.com/r/technology/comments/tech11',
    flair: 'Hardware'
  },
  {
    id: 'post-12',
    title: 'Comparison analysis between modern web assembly runtimes',
    author: 'wasm_dev',
    score: 820,
    numComments: 76,
    sentiment: 'Neutral',
    sentimentScore: 0,
    createdUtc: '12 hours ago',
    permalink: 'https://reddit.com/r/technology/comments/tech12',
    flair: 'Programming'
  },
  {
    id: 'post-13',
    title: 'Data privacy audit reveals hidden tracking in popular mobile apps',
    author: 'privacy_matters',
    score: 3410,
    numComments: 495,
    sentiment: 'Negative',
    sentimentScore: -4,
    createdUtc: '13 hours ago',
    permalink: 'https://reddit.com/r/technology/comments/tech13',
    flair: 'Privacy'
  },
  {
    id: 'post-14',
    title: 'Revolutionary quantum computing algorithm solves complex fluid dynamics',
    author: 'physics_byte',
    score: 2900,
    numComments: 198,
    sentiment: 'Positive',
    sentimentScore: 4,
    createdUtc: '14 hours ago',
    permalink: 'https://reddit.com/r/technology/comments/tech14',
    flair: 'Research'
  },
  {
    id: 'post-15',
    title: 'Global semiconductor shipment data published for Q3',
    author: 'market_analyst',
    score: 510,
    numComments: 45,
    sentiment: 'Neutral',
    sentimentScore: 0,
    createdUtc: '15 hours ago',
    permalink: 'https://reddit.com/r/technology/comments/tech15',
    flair: 'Business'
  },
  {
    id: 'post-16',
    title: 'Electric vehicle charging network expands along major transport corridors',
    author: 'ev_road',
    score: 1430,
    numComments: 188,
    sentiment: 'Positive',
    sentimentScore: 3,
    createdUtc: '15 hours ago',
    permalink: 'https://reddit.com/r/technology/comments/tech16',
    flair: 'Automotive'
  },
  {
    id: 'post-17',
    title: 'Antitrust trial hearings begin regarding cloud computing contracts',
    author: 'court_watcher',
    score: 1120,
    numComments: 164,
    sentiment: 'Neutral',
    sentimentScore: 0,
    createdUtc: '16 hours ago',
    permalink: 'https://reddit.com/r/technology/comments/tech17',
    flair: 'Policy & Law'
  },
  {
    id: 'post-18',
    title: 'Ransomware gang disrupts municipal hospital digital records',
    author: 'sec_dispatch',
    score: 2850,
    numComments: 340,
    sentiment: 'Negative',
    sentimentScore: -5,
    createdUtc: '17 hours ago',
    permalink: 'https://reddit.com/r/technology/comments/tech18',
    flair: 'Security'
  },
  {
    id: 'post-19',
    title: 'Biomedical sensor enables non-invasive continuous glucose monitoring',
    author: 'med_tech',
    score: 4100,
    numComments: 512,
    sentiment: 'Positive',
    sentimentScore: 5,
    createdUtc: '18 hours ago',
    permalink: 'https://reddit.com/r/technology/comments/tech19',
    flair: 'Biotech'
  },
  {
    id: 'post-20',
    title: 'Telemetry benchmarks on the new ARM server processors',
    author: 'bench_pro',
    score: 760,
    numComments: 89,
    sentiment: 'Neutral',
    sentimentScore: 0,
    createdUtc: '18 hours ago',
    permalink: 'https://reddit.com/r/technology/comments/tech20',
    flair: 'Hardware'
  },
  {
    id: 'post-21',
    title: 'Broadband customer support wait times reach historic worst, audit finds',
    author: 'telco_skeptic',
    score: 1980,
    numComments: 315,
    sentiment: 'Negative',
    sentimentScore: -3,
    createdUtc: '19 hours ago',
    permalink: 'https://reddit.com/r/technology/comments/tech21',
    flair: 'Networking'
  },
  {
    id: 'post-22',
    title: 'Solid-state electrolyte battery achieves 1,000 cycle durability test',
    author: 'materials_lab',
    score: 2310,
    numComments: 204,
    sentiment: 'Positive',
    sentimentScore: 3,
    createdUtc: '20 hours ago',
    permalink: 'https://reddit.com/r/technology/comments/tech22',
    flair: 'Energy'
  },
  {
    id: 'post-23',
    title: 'Standardizing USB-C charging protocol for power tools and appliances',
    author: 'standard_watch',
    score: 1240,
    numComments: 110,
    sentiment: 'Neutral',
    sentimentScore: 1,
    createdUtc: '21 hours ago',
    permalink: 'https://reddit.com/r/technology/comments/tech23',
    flair: 'Hardware'
  },
  {
    id: 'post-24',
    title: 'Major vendor sunsets support for popular developer automation tool',
    author: 'pipeline_engineer',
    score: 1670,
    numComments: 280,
    sentiment: 'Negative',
    sentimentScore: -2,
    createdUtc: '22 hours ago',
    permalink: 'https://reddit.com/r/technology/comments/tech24',
    flair: 'Software'
  },
  {
    id: 'post-25',
    title: 'Community restores vintage mainframe and publishes detailed schematics',
    author: 'retro_compute',
    score: 1840,
    numComments: 95,
    sentiment: 'Positive',
    sentimentScore: 3,
    createdUtc: '23 hours ago',
    permalink: 'https://reddit.com/r/technology/comments/tech25',
    flair: 'History'
  },
  {
    id: 'post-26',
    title: 'Survey of developer salary distributions across remote tech hubs',
    author: 'stats_dev',
    score: 930,
    numComments: 160,
    sentiment: 'Neutral',
    sentimentScore: 0,
    createdUtc: '1 day ago',
    permalink: 'https://reddit.com/r/technology/comments/tech26',
    flair: 'Discussion'
  },
  {
    id: 'post-27',
    title: 'Critical zero-day actively exploited in popular web server framework',
    author: 'zeroday_alert',
    score: 3100,
    numComments: 360,
    sentiment: 'Negative',
    sentimentScore: -4,
    createdUtc: '1 day ago',
    permalink: 'https://reddit.com/r/technology/comments/tech27',
    flair: 'Security'
  },
  {
    id: 'post-28',
    title: 'Compact fusion reactor prototype sustains magnetic confinement test',
    author: 'plasma_sci',
    score: 4500,
    numComments: 620,
    sentiment: 'Positive',
    sentimentScore: 4,
    createdUtc: '1 day ago',
    permalink: 'https://reddit.com/r/technology/comments/tech28',
    flair: 'Energy'
  },
  {
    id: 'post-29',
    title: 'Overview of the proposed updates to the HTTP/3 specification',
    author: 'web_protocols',
    score: 610,
    numComments: 48,
    sentiment: 'Neutral',
    sentimentScore: 0,
    createdUtc: '1 day ago',
    permalink: 'https://reddit.com/r/technology/comments/tech29',
    flair: 'Networking'
  },
  {
    id: 'post-30',
    title: 'Cloud outage impacts financial transactions across three continents',
    author: 'cloud_monitor',
    score: 2240,
    numComments: 390,
    sentiment: 'Negative',
    sentimentScore: -3,
    createdUtc: '1 day ago',
    permalink: 'https://reddit.com/r/technology/comments/tech30',
    flair: 'Cloud'
  },
  {
    id: 'post-31',
    title: 'Autonomous maritime drone sets clean energy ocean mapping record',
    author: 'ocean_byte',
    score: 1390,
    numComments: 74,
    sentiment: 'Positive',
    sentimentScore: 3,
    createdUtc: '1 day ago',
    permalink: 'https://reddit.com/r/technology/comments/tech31',
    flair: 'Robotics'
  },
  {
    id: 'post-32',
    title: 'Technical summary: What happens under the hood during memory paging',
    author: 'kernel_deepdive',
    score: 870,
    numComments: 62,
    sentiment: 'Neutral',
    sentimentScore: 0,
    createdUtc: '1 day ago',
    permalink: 'https://reddit.com/r/technology/comments/tech32',
    flair: 'Education'
  },
  {
    id: 'post-33',
    title: 'Ad network SDK caught evading privacy sandboxes on smart TVs',
    author: 'tv_audit',
    score: 1720,
    numComments: 215,
    sentiment: 'Negative',
    sentimentScore: -3,
    createdUtc: '2 days ago',
    permalink: 'https://reddit.com/r/technology/comments/tech33',
    flair: 'Privacy'
  },
  {
    id: 'post-34',
    title: 'Non-profit releases free accessible screen reader with natural AI voice',
    author: 'access_tech',
    score: 2980,
    numComments: 180,
    sentiment: 'Positive',
    sentimentScore: 4,
    createdUtc: '2 days ago',
    permalink: 'https://reddit.com/r/technology/comments/tech34',
    flair: 'Accessibility'
  },
  {
    id: 'post-35',
    title: 'Breakdown of IPv6 adoption rates across developing regions',
    author: 'net_engineer',
    score: 540,
    numComments: 51,
    sentiment: 'Neutral',
    sentimentScore: 0,
    createdUtc: '2 days ago',
    permalink: 'https://reddit.com/r/technology/comments/tech35',
    flair: 'Networking'
  },
  {
    id: 'post-36',
    title: 'Phishing campaigns leverage spoofed vendor invoices targeting SMEs',
    author: 'threat_intel',
    score: 1150,
    numComments: 130,
    sentiment: 'Negative',
    sentimentScore: -2,
    createdUtc: '2 days ago',
    permalink: 'https://reddit.com/r/technology/comments/tech36',
    flair: 'Security'
  },
  {
    id: 'post-37',
    title: 'New optical interconnect delivers 10x throughput for AI datacenters',
    author: 'photon_chip',
    score: 2100,
    numComments: 165,
    sentiment: 'Positive',
    sentimentScore: 3,
    createdUtc: '2 days ago',
    permalink: 'https://reddit.com/r/technology/comments/tech37',
    flair: 'Hardware'
  },
  {
    id: 'post-38',
    title: 'Government committee publishes whitepaper on AI governance guidelines',
    author: 'policy_review',
    score: 720,
    numComments: 98,
    sentiment: 'Neutral',
    sentimentScore: 0,
    createdUtc: '2 days ago',
    permalink: 'https://reddit.com/r/technology/comments/tech38',
    flair: 'Policy & Law'
  },
  {
    id: 'post-39',
    title: 'Battery degradation issues trigger class action lawsuit against manufacturer',
    author: 'legal_tech',
    score: 2410,
    numComments: 388,
    sentiment: 'Negative',
    sentimentScore: -3,
    createdUtc: '2 days ago',
    permalink: 'https://reddit.com/r/technology/comments/tech39',
    flair: 'Hardware'
  },
  {
    id: 'post-40',
    title: 'Robotic surgical assistant completes first remote micro-suture procedure',
    author: 'surgical_ai',
    score: 3560,
    numComments: 270,
    sentiment: 'Positive',
    sentimentScore: 4,
    createdUtc: '3 days ago',
    permalink: 'https://reddit.com/r/technology/comments/tech40',
    flair: 'Biotech'
  },
  {
    id: 'post-41',
    title: 'Comprehensive history of compiler optimization techniques',
    author: 'cs_educator',
    score: 890,
    numComments: 70,
    sentiment: 'Neutral',
    sentimentScore: 0,
    createdUtc: '3 days ago',
    permalink: 'https://reddit.com/r/technology/comments/tech41',
    flair: 'Computer Science'
  },
  {
    id: 'post-42',
    title: 'Telecom giant cuts fiber deployment budget causing rural rollout delays',
    author: 'broadband_watch',
    score: 1620,
    numComments: 245,
    sentiment: 'Negative',
    sentimentScore: -3,
    createdUtc: '3 days ago',
    permalink: 'https://reddit.com/r/technology/comments/tech42',
    flair: 'Networking'
  },
  {
    id: 'post-43',
    title: 'Lightweight neural net operates real-time translation entirely on-device',
    author: 'edge_computing',
    score: 1950,
    numComments: 180,
    sentiment: 'Positive',
    sentimentScore: 3,
    createdUtc: '3 days ago',
    permalink: 'https://reddit.com/r/technology/comments/tech43',
    flair: 'Artificial Intelligence'
  },
  {
    id: 'post-44',
    title: 'Quarterly state of open source database benchmarks and latency metrics',
    author: 'db_tuner',
    score: 670,
    numComments: 58,
    sentiment: 'Neutral',
    sentimentScore: 0,
    createdUtc: '3 days ago',
    permalink: 'https://reddit.com/r/technology/comments/tech44',
    flair: 'Databases'
  },
  {
    id: 'post-45',
    title: 'Smart thermostat update causes uncommanded heating spikes in winter',
    author: 'iot_watchdog',
    score: 2190,
    numComments: 310,
    sentiment: 'Negative',
    sentimentScore: -4,
    createdUtc: '3 days ago',
    permalink: 'https://reddit.com/r/technology/comments/tech45',
    flair: 'IoT'
  },
  {
    id: 'post-46',
    title: 'Deep sea telecommunication cable repairs finished ahead of schedule',
    author: 'cable_ship_ops',
    score: 1480,
    numComments: 92,
    sentiment: 'Positive',
    sentimentScore: 2,
    createdUtc: '4 days ago',
    permalink: 'https://reddit.com/r/technology/comments/tech46',
    flair: 'Infrastructure'
  },
  {
    id: 'post-47',
    title: 'Standardizing containerized workload telemetry: OTel 2.0 release notes',
    author: 'devops_pilot',
    score: 780,
    numComments: 64,
    sentiment: 'Neutral',
    sentimentScore: 0,
    createdUtc: '4 days ago',
    permalink: 'https://reddit.com/r/technology/comments/tech47',
    flair: 'DevOps'
  },
  {
    id: 'post-48',
    title: 'Recycling plant deploys automated computer vision for e-waste sorting',
    author: 'circular_tech',
    score: 1350,
    numComments: 104,
    sentiment: 'Positive',
    sentimentScore: 3,
    createdUtc: '4 days ago',
    permalink: 'https://reddit.com/r/technology/comments/tech48',
    flair: 'CleanTech'
  },
  {
    id: 'post-49',
    title: 'Memory leak in popular cross-platform UI framework remains unpatched',
    author: 'perf_hunter',
    score: 1530,
    numComments: 202,
    sentiment: 'Negative',
    sentimentScore: -2,
    createdUtc: '4 days ago',
    permalink: 'https://reddit.com/r/technology/comments/tech49',
    flair: 'Software'
  },
  {
    id: 'post-50',
    title: 'Statistical analysis of wireless spectrum interference in urban density',
    author: 'rf_engineer',
    score: 590,
    numComments: 41,
    sentiment: 'Neutral',
    sentimentScore: 0,
    createdUtc: '4 days ago',
    permalink: 'https://reddit.com/r/technology/comments/tech50',
    flair: 'Hardware'
  }
];

import { deriveSubredditAnalysis } from '../utils/sentimentUtils';

// Normalizer to ensure all fields (both camelCase and standard Reddit format) are populated
export function normalizePost(raw: Partial<RedditPost> & { id: string; title: string; author: string; score: number }): RedditPost {
  const comments = raw.comments ?? raw.numComments ?? 0;
  const createdAt = raw.createdAt ?? raw.createdUtc ?? 'Just now';
  const category = raw.category ?? raw.flair ?? 'General';
  const url = raw.url ?? raw.permalink ?? `https://reddit.com/r/technology/comments/${raw.id}`;
  const sentiment = raw.sentiment || 'Neutral';
  const sentimentScore = raw.sentimentScore ?? 0;

  return {
    id: raw.id,
    title: raw.title,
    author: raw.author,
    score: raw.score,
    comments,
    numComments: comments,
    createdAt,
    createdUtc: createdAt,
    category,
    flair: category,
    sentiment,
    sentimentScore,
    url,
    permalink: url,
    sentimentExplanation: raw.sentimentExplanation,
  };
}

// Calculation helper for analysis summary
export function calculateSubredditAnalysis(subreddit: string, posts: RedditPost[]): SubredditAnalysis {
  const normalizedPosts = posts.map(normalizePost);
  return deriveSubredditAnalysis(subreddit, normalizedPosts);
}

// Preset subreddit mock catalogs for rich demo switching
export const MOCK_SUBREDDITS_DATA: Record<string, RedditPost[]> = {
  technology: technologyMockPosts,
  programming: [
    {
      id: 'prog-1',
      title: 'Rust 2026 Edition released with revolutionary compile-time optimizations',
      author: 'ferris_dev',
      score: 3400,
      numComments: 450,
      sentiment: 'Positive',
      sentimentScore: 4,
      createdUtc: '1 hour ago',
      permalink: 'https://reddit.com/r/programming/comments/prog01',
      flair: 'Release',
      sentimentExplanation: 'Strong community praise for performance enhancements.'
    },
    {
      id: 'prog-2',
      title: 'Why we migrated our monolith back from microservices: 2 years later',
      author: 'arch_guru',
      score: 4120,
      numComments: 670,
      sentiment: 'Neutral',
      sentimentScore: 0,
      createdUtc: '3 hours ago',
      permalink: 'https://reddit.com/r/programming/comments/prog02',
      flair: 'Architecture',
      sentimentExplanation: 'Balanced engineering retrospective.'
    },
    {
      id: 'prog-3',
      title: 'TypeScript 5.8 adds incredible type inference for recursive generics',
      author: 'ts_fanatic',
      score: 2890,
      numComments: 310,
      sentiment: 'Positive',
      sentimentScore: 4,
      createdUtc: '4 hours ago',
      permalink: 'https://reddit.com/r/programming/comments/prog03',
      flair: 'TypeScript'
    },
    {
      id: 'prog-4',
      title: 'Major package manager outage halts CI/CD pipelines worldwide',
      author: 'pipeline_watcher',
      score: 2310,
      numComments: 390,
      sentiment: 'Negative',
      sentimentScore: -4,
      createdUtc: '6 hours ago',
      permalink: 'https://reddit.com/r/programming/comments/prog04',
      flair: 'DevOps'
    },
    {
      id: 'prog-5',
      title: 'Clean code architecture and pattern matching in modern languages',
      author: 'code_craftsman',
      score: 1450,
      numComments: 180,
      sentiment: 'Positive',
      sentimentScore: 2,
      createdUtc: '8 hours ago',
      permalink: 'https://reddit.com/r/programming/comments/prog05',
      flair: 'Tutorial'
    },
    {
      id: 'prog-6',
      title: 'Analyzing garbage collection pause times across runtime engines',
      author: 'vm_hacker',
      score: 1100,
      numComments: 94,
      sentiment: 'Neutral',
      sentimentScore: 0,
      createdUtc: '10 hours ago',
      permalink: 'https://reddit.com/r/programming/comments/prog06',
      flair: 'Performance'
    },
    {
      id: 'prog-7',
      title: 'Frustrating deprecation warnings breaking legacy test suites',
      author: 'qa_lead',
      score: 1280,
      numComments: 195,
      sentiment: 'Negative',
      sentimentScore: -2,
      createdUtc: '12 hours ago',
      permalink: 'https://reddit.com/r/programming/comments/prog07',
      flair: 'Testing'
    },
    {
      id: 'prog-8',
      title: 'Show Reddit: A zero-dependency lightweight SQLite wrapper for Go',
      author: 'gopher_guy',
      score: 2150,
      numComments: 145,
      sentiment: 'Positive',
      sentimentScore: 3,
      createdUtc: '14 hours ago',
      permalink: 'https://reddit.com/r/programming/comments/prog08',
      flair: 'Showcase'
    },
    {
      id: 'prog-9',
      title: 'Understanding cache coherence and CPU memory barriers',
      author: 'systems_prof',
      score: 970,
      numComments: 82,
      sentiment: 'Neutral',
      sentimentScore: 0,
      createdUtc: '16 hours ago',
      permalink: 'https://reddit.com/r/programming/comments/prog09',
      flair: 'Systems'
    },
    {
      id: 'prog-10',
      title: 'Technical debt is overwhelming our team after hurried MVP release',
      author: 'tired_coder',
      score: 3100,
      numComments: 480,
      sentiment: 'Negative',
      sentimentScore: -3,
      createdUtc: '18 hours ago',
      permalink: 'https://reddit.com/r/programming/comments/prog10',
      flair: 'Discussion'
    }
  ],
  gaming: [
    {
      id: 'game-1',
      title: 'Indie RPG wins Game of the Year acclaim with phenomenal world design',
      author: 'rpg_lover',
      score: 5400,
      numComments: 890,
      sentiment: 'Positive',
      sentimentScore: 5,
      createdUtc: '2 hours ago',
      permalink: 'https://reddit.com/r/gaming/comments/game01',
      flair: 'Review'
    },
    {
      id: 'game-2',
      title: 'New patch dramatically improves frame rates on handheld consoles',
      author: 'deck_gamer',
      score: 3820,
      numComments: 410,
      sentiment: 'Positive',
      sentimentScore: 4,
      createdUtc: '4 hours ago',
      permalink: 'https://reddit.com/r/gaming/comments/game02',
      flair: 'News'
    },
    {
      id: 'game-3',
      title: 'Upcoming AAA release introduces predatory microtransactions at launch',
      author: 'lootbox_critic',
      score: 6200,
      numComments: 1420,
      sentiment: 'Negative',
      sentimentScore: -5,
      createdUtc: '5 hours ago',
      permalink: 'https://reddit.com/r/gaming/comments/game03',
      flair: 'Industry'
    },
    {
      id: 'game-4',
      title: 'Developers share retrospective documentary on level design evolution',
      author: 'game_doc',
      score: 1600,
      numComments: 120,
      sentiment: 'Neutral',
      sentimentScore: 0,
      createdUtc: '7 hours ago',
      permalink: 'https://reddit.com/r/gaming/comments/game04',
      flair: 'Documentary'
    },
    {
      id: 'game-5',
      title: 'Server connection drops plague competitive tournament finals',
      author: 'esports_ref',
      score: 2900,
      numComments: 580,
      sentiment: 'Negative',
      sentimentScore: -4,
      createdUtc: '9 hours ago',
      permalink: 'https://reddit.com/r/gaming/comments/game05',
      flair: 'Esports'
    }
  ],
  science: [
    {
      id: 'sci-1',
      title: 'James Webb Space Telescope detects organic molecules in distant proto-planetary disk',
      author: 'astro_dan',
      score: 7200,
      numComments: 630,
      sentiment: 'Positive',
      sentimentScore: 4,
      createdUtc: '3 hours ago',
      permalink: 'https://reddit.com/r/science/comments/sci01',
      flair: 'Astronomy'
    },
    {
      id: 'sci-2',
      title: 'Double-blind clinical study shows efficacy of novel targeted immunotherapy',
      author: 'oncology_md',
      score: 4890,
      numComments: 380,
      sentiment: 'Positive',
      sentimentScore: 4,
      createdUtc: '6 hours ago',
      permalink: 'https://reddit.com/r/science/comments/sci02',
      flair: 'Medicine'
    },
    {
      id: 'sci-3',
      title: 'Global climate modeling data updated with Arctic ice core measurements',
      author: 'glacier_sci',
      score: 2450,
      numComments: 310,
      sentiment: 'Neutral',
      sentimentScore: 0,
      createdUtc: '8 hours ago',
      permalink: 'https://reddit.com/r/science/comments/sci03',
      flair: 'Earth Science'
    },
    {
      id: 'sci-4',
      title: 'Accelerated permafrost thawing releases methane faster than projected',
      author: 'climate_monitor',
      score: 5120,
      numComments: 790,
      sentiment: 'Negative',
      sentimentScore: -4,
      createdUtc: '11 hours ago',
      permalink: 'https://reddit.com/r/science/comments/sci04',
      flair: 'Environment'
    }
  ]
};

// Simulated mock fetch function ready to be swapped with real Reddit API later
export async function fetchSubredditAnalysis(subredditName: string): Promise<SubredditAnalysis> {
  const cleanName = subredditName.trim().toLowerCase().replace(/^r\//, '');

  // 1. Try to load from Supabase
  const existing = await fetchAnalysisFromSupabase(cleanName);
  if (existing) {
    return existing;
  }

  // 2. Not found – generate mock analysis
  await new Promise(resolve => setTimeout(resolve, 800));

  if (cleanName === 'error' || cleanName === 'invalid') {
    throw new Error(`Unable to analyze r/${cleanName}. Subreddit might be private, banned, or does not exist.`);
  }

  if (cleanName === 'empty') {
    return calculateSubredditAnalysis(cleanName, []);
  }

  let posts: RedditPost[];
  if (MOCK_SUBREDDITS_DATA[cleanName]) {
    posts = MOCK_SUBREDDITS_DATA[cleanName];
  } else {
    // ✅ This is the correct generation logic – copy it from your original function
    const sentiments: ('Positive' | 'Neutral' | 'Negative')[] = [
      'Positive', 'Positive', 'Positive',
      'Neutral', 'Neutral', 'Neutral', 'Neutral',
      'Negative', 'Negative'
    ];
    posts = Array.from({ length: 50 }, (_, i) => {
      const sentiment = sentiments[i % sentiments.length];
      const sentimentScore = sentiment === 'Positive'
        ? Math.floor(Math.random() * 4) + 1
        : sentiment === 'Negative'
        ? -(Math.floor(Math.random() * 4) + 1)
        : 0;
      return {
        id: `gen-${cleanName}-${i + 1}`,
        title: `Latest trending discussion #${i + 1} regarding r/${cleanName} community updates and topics`,
        author: `user_${cleanName}_${i + 1}`,
        score: Math.floor(Math.random() * 3500) + 120,
        numComments: Math.floor(Math.random() * 450) + 25,
        sentiment,
        sentimentScore,
        createdUtc: `${(i % 24) + 1} hours ago`,
        permalink: `https://reddit.com/r/${cleanName}/comments/post${i + 1}`,
        flair: i % 3 === 0 ? 'Discussion' : i % 3 === 1 ? 'News' : 'Community',
        sentimentExplanation: sentiment === 'Positive'
          ? 'Favorable language and optimistic sentiment detected.'
          : sentiment === 'Negative'
          ? 'Critical tone and concern keywords detected.'
          : 'Neutral informative discourse.'
      };
    });
  }

  const analysis = calculateSubredditAnalysis(cleanName, posts);

  // 3. Save to Supabase for caching
  await saveAnalysisToSupabase(analysis).catch(err => console.error('Failed to save analysis:', err));

  return analysis;
}