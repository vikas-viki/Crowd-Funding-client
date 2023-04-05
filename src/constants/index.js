import { createCampaign, dashboard, refund, profile, withdraw } from '../assets';

export const navlinks = [
  {
    name: 'dashboard',
    imgUrl: dashboard,
    link: '/',
  },
  {
    name: 'campaign',
    imgUrl: createCampaign,
    link: '/create-campaign',
  },
  {
    name: 'refund',
    imgUrl: refund,
    link: '/refund'
  },
  {
    name: 'withdraw',
    imgUrl: withdraw,
    link: '/withdraw',
  },
  {
    name: 'profile',
    imgUrl: profile,
    link: '/profile',
  }
];
