import { StyleConfig } from '@chakra-ui/theme-tools';

interface ComponentStyles {
  components: Record<string, StyleConfig>;
}

const noFocusBoxShadow = {
  _focus: {
    outline: 'none',
    boxShadow: 'none !important',
  },
};

export const Components: ComponentStyles = {
  components: {
    Button: {
      baseStyle: noFocusBoxShadow,
      sizes: {
        cardButtonSize: {
          w: '103px',
          h: '32px',
        },
        buttonForPublish: {
          w: '130px',
          h: '50px',
        },
        assignedCard: {
          w: '133px',
          h: '33px',
        },
        dashboardCardButtonSize: {
          w: '77px',
          h: '25px',
        },
        dashboardButton: {
          w: '265px',
          h: '120px',
        },
        checkpointCardButton: {
          w: '93px',
          height: '32px',
        },
      },
      variants: {
        primaryButton: () => ({
          bgColor: '#5473B9',
          _hover: {
            bgColor: ' #4D4D8E',
            _disabled: {
              bgColor: '#74889B',
            },
          },
          _active: {
            bgColor: '#3C3C69',
          },
          _disabled: {
            bgColor: '#74889B',
          },
          color: '#FFFFFF',
        }),

        secondaryButton: () => ({
          bgColor: '#FFFFFF',
          _hover: {
            bgColor: '#E2E8F0',
            _disabled: {
              bgColor: '#E2E8F0',
            },
          },
          _active: {
            bgColor: '#E2E8F0',
          },
          _disabled: {
            bgColor: '#E2E8F0',
          },
          color: '#000000',
          border: '1px solid #C2CCD9',
        }),
        tertiaryButton: () => ({
          bgColor: '#FFFFFF',
          _hover: {
            bgColor: '#E2E8F0',
            _disabled: {
              bgColor: '#E2E8F0',
            },
          },
          _active: {
            bgColor: '#E2E8F0',
          },
          _disabled: {
            bgColor: '#E2E8F0',
          },
          color: '#000000',
          border: 'none',
        }),

        markAsDoneButton: () => ({
          bgColor: '#54B95E',
          _hover: {
            bgColor: '#517B51',
            _disabled: {
              bgColor: '#54B95E',
            },
          },
          _active: {
            bgColor: '#003600',
          },
          _disabled: {
            bgColor: '#54B95E',
          },
          color: '#FFFFFF',
          border: 'none',
        }),

        deleteButton: () => ({
          bgColor: 'danger',
          _hover: {
            bgColor: 'danger',
          },
          _focus: {
            bgColor: 'danger',
          },
          _active: {
            bgColor: 'danger',
          },
          color: 'addButton.text',
        }),
      },
    },

    Tabs: {
      variants: {
        'soft-rounded': {
          tab: {
            _selected: {
              backgroundColor: '#5473B9',
              color: '#FFFFFF',
              fontWeight: 'bold',
              borderRadius: '2rem',
            },
            _focus: {
              backgroundColor: '#5473B9',
              boxShadow: 'none !important',
            },
          },
        },
        baseStyle: {
          tab: {
            ...noFocusBoxShadow,
          },
        },
        viewSwitch: ({ colorMode }) => ({
          tab: {
            _selected: {
              backgroundColor: '#5473B9',
              color: '#FFFFFF',
              fontWeight: 'bold',
              borderRadius: '2rem',
            },
            _focus: {
              backgroundColor: '#5473B9',
              boxShadow: 'none !important',
            },
          },
        }),
        primaryTabs: ({ colorMode }) => ({
          tab: {
            bgColor: '#F6F7F9',
            borderColor: '#A1A1A133',
            color: '#535353CC',
            border: '1px solid',
            width: { base: '120px', lg: '175px' },
            fontSize: 'lg',
            _selected: {
              backgroundColor: '#FFFFFF',
              color: '#5473B9',
              fontWeight: 'semibold',
            },
            _focus: {
              boxShadow: 'none !important',
            },
          },
        }),
      },
    },
    Tag: {
      variants: {
        addNewCheckpoint: props => ({
          bgColor: '#00942C',
          color: 'red',
          colorScheme: 'red',
          borderRadius: '2rem',
        }),
        addNewUser: {
          bgColor: '#FC9707',
        },
        comment: {
          bgColor: '#9040E0',
        },
        revision: {
          bgColor: '#518094',
        },
        approval: {
          bgColor: '#8A7AB9',
        },
      },
    },
  },
};
