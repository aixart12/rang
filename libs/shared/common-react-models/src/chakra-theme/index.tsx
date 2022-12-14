import { extendTheme } from '@chakra-ui/react';
import { Colors, Components, Shadows, Sizes, Spaces } from './theme-blocks';
import { Borders } from './theme-blocks/borders';

export const theme = extendTheme({
  ...Colors,
  ...Shadows,
  ...Sizes,
  ...Spaces,
  ...Components,
  ...Borders,
  fonts: {
    fontFamily: `"Poppins", "sans-serif"`,
  },
  styles: {
    global: {
      '.react-calendar': {
        display: 'flex',
        flexDir: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: 'full',
        minWidth: '774px',
      },
      '.react-calendar__navigation': {
        display: 'flex',
        width: 'full',
        px: '8',
        pb: '6',
      },
      '.react-calendar__navigation button': {
        minWidth: '44px',
        background: 'none',
        fontSize: 'lg',
        fontWeight: 'semibold',
      },
      '.react-calendar--doubleView': {
        width: '700px',
      },
      '.react-calendar__viewContainer': {
        display: 'flex',
        width: 'full',
      },
      '.react-calendar button:enabled:hover': {
        cursor: 'pointer',
      },
      '.react-calendar__navigation button:enabled:hover, .react-calendar__navigation button:enabled:focus':
        {
          backgroundColor: '#e6e6e6',
        },
      '.react-calendar__navigation button[disabled]': {
        backgroundColor: '#f0f0f0',
      },
      '.react-calendar__month-view__weekdays': {
        textAlign: 'center',
        textTransform: 'upperCase',
        fontWeight: 'semibold',
        fontSize: 'sm',
        py: '4',
      },
      '.react-calendar__month-view__weekNumbers': {
        fontSize: 'sm',
        fontWeight: 'semibold',
      },
      '.react-calendar__month-view__days__day--neighboringMonth': {
        color: '#B6B6B6 !important',
        cursor: 'pointer !important',
      },
      '.react-calendar__tile': {
        textAlign: 'center',
        color: '#101A32CC',
      },

      '.react-calendar__month-view, .react-calendar__year-view, .react-calendar__decade-view':
        {
          display: 'flex',
          width: 'full',
          alignItems: 'start',
        },
      '.react-calendar__month-view__days': {
        display: 'grid !important',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '1.2em',
        gridColumnGap: '5em',
        px: '40px',
        minHeight: '272px',
      },
      '.react-calendar__month-view__weekdays__weekday': {},
      '.react-calendar__month-view__days__day': {
        px: '2',
        width: 'fit-content',
        cursor: 'default !important',
      },
      'abbr[title]': {
        textDecoration: 'none',
      },
      '.react-calendar__tile:disabled': {
        backgroundColor: '#f0f0f0',
      },
      // [`.${ScheduledEventType.PENDING}`]: {
      //   background: '#FFC00066',
      //   color: '#40485B',
      //   height: '35px',
      //   width: '35px',
      //   borderRadius: '50%',
      // },
      // [`.${ScheduledEventType.COMPLETED}`]: {
      //   background: '#0E70004D',
      //   color: '#40485B',
      //   height: '35px',
      //   width: '35px',
      //   borderRadius: '50%',
      // },
      // [`.${ScheduledEventType.UPCOMING}`]: {
      //   background: '#DE8D4D99',
      //   color: '#40485B',
      //   height: '35px',
      //   width: '35px',
      //   borderRadius: '50%',
      // },
      '&::-webkit-scrollbar': {
        width: '10px',
        height: '5px',
        borderRadius: '16px',
        margin: '10px',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: `#c1c1c1`,
        borderRadius: '16px',
        width: '3px',
        height: '10px',
      },
      '*:focus': {
        boxShadow: 'none !important',
      },
    },
  },
});
