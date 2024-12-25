export const APP_COLORS = {
neutral: {
  transparent: 'transparent',
  light: 'rgba(153, 146, 134, 0.2)',
  medium: 'rgba(140, 126, 98, 0.3)',
  dark: 'rgba(153, 146, 134, 0.3)',
},
accent: {
  dark: 'rgba(0, 0, 0, 0.75)',
},
primary: {
  light: '#fff',
  dark: '#000',
},
} as const;

export const APP_BREAKPOINTS = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1600,
} as const;
