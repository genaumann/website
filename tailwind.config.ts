import type {Config} from 'tailwindcss'

export default {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  darkMode: 'selector',
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        }
      },
      fontFamily: {
        sans: ['var(--font-sans)']
      },
      boxShadow: {
        t: '0 -1px 2px 0 rgba(0, 0, 0, 0.05)',
        't-md':
          '0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        't-lg':
          '0 -10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        't-xl':
          '0 -20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        't-2xl': '0 -25px 50px -12px rgba(0, 0, 0, 0.25)',
        't-3xl': '0 -35px 60px -15px rgba(0, 0, 0, 0.3)',
        b: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'b-md':
          '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06)',
        'b-lg':
          '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 -4px 6px -2px rgba(0, 0, 0, 0.05)',
        'b-xl':
          '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 -10px 10px -5px rgba(0, 0, 0, 0.04)',
        'b-2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'b-3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
        l: '-1px 0 2px 0 rgba(0, 0, 0, 0.05)',
        'l-md':
          '-4px 0 6px -1px rgba(0, 0, 0, 0.1), 2px 0 4px -1px rgba(0, 0, 0, 0.06)',
        'l-lg':
          '-10px 0 15px -3px rgba(0, 0, 0, 0.1), 4px 0 6px -2px rgba(0, 0, 0, 0.05)',
        'l-xl':
          '-20px 0 25px -5px rgba(0, 0, 0, 0.1), 10px 0 10px -5px rgba(0, 0, 0, 0.04)',
        'l-2xl': '-25px 0 50px -12px rgba(0, 0, 0, 0.25)',
        'l-3xl': '-35px 0 60px -15px rgba(0, 0, 0, 0.3)',
        r: '1px 0 2px 0 rgba(0, 0, 0, 0.05)',
        'r-md':
          '4px 0 6px -1px rgba(0, 0, 0, 0.1), -2px 0 4px -1px rgba(0, 0, 0, 0.06)',
        'r-lg':
          '10px 0 15px -3px rgba(0, 0, 0, 0.1), -4px 0 6px -2px rgba(0, 0, 0, 0.05)',
        'r-xl':
          '20px 0 25px -5px rgba(0, 0, 0, 0.1), -10px 0 10px -5px rgba(0, 0, 0, 0.04)',
        'r-2xl': '25px 0 50px -12px rgba(0, 0, 0, 0.25)',
        'r-3xl': '35px 0 60px -15px rgba(0, 0, 0, 0.3)',
        all: '0 0 2px 0 rgba(0, 0, 0, 0.05)',
        'all-md':
          '0 0 6px -1px rgba(0, 0, 0, 0.1), 0 0 4px -1px rgba(0, 0, 0, 0.06)',
        'all-lg':
          '0 0 15px -3px rgba(0, 0, 0, 0.1), 0 0 6px -2px rgba(0, 0, 0, 0.05)',
        'all-xl':
          '0 0 25px -5px rgba(0, 0, 0, 0.1), 0 0 10px -5px rgba(0, 0, 0, 0.04)',
        'all-2xl': '0 0 50px -12px rgba(0, 0, 0, 0.25)',
        'all-3xl': '0 0 60px -15px rgba(0, 0, 0, 0.3)',
        x: '1px 0 2px 0 rgba(0, 0, 0, 0.05), -1px 0 2px 0 rgba(0, 0, 0, 0.05)',
        'x-md':
          '4px 0 6px -1px rgba(0, 0, 0, 0.1), -4px 0 6px -1px rgba(0, 0, 0, 0.1)',
        'x-lg':
          '10px 0 15px -3px rgba(0, 0, 0, 0.1), -10px 0 15px -3px rgba(0, 0, 0, 0.1)',
        'x-xl':
          '20px 0 25px -5px rgba(0, 0, 0, 0.1), -20px 0 25px -5px rgba(0, 0, 0, 0.1)',
        'x-2xl':
          '25px 0 50px -12px rgba(0, 0, 0, 0.25), -25px 0 50px -12px rgba(0, 0, 0, 0.25)',
        'x-3xl':
          '35px 0 60px -15px rgba(0, 0, 0, 0.3), -35px 0 60px -15px rgba(0, 0, 0, 0.3)',
        y: '0 1px 2px 0 rgba(0, 0, 0, 0.05), 0 -1px 2px 0 rgba(0, 0, 0, 0.05)',
        'y-md':
          '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 -4px 6px -1px rgba(0, 0, 0, 0.1)',
        'y-lg':
          '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 -10px 15px -3px rgba(0, 0, 0, 0.1)',
        'y-xl':
          '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 -20px 25px -5px rgba(0, 0, 0, 0.1)',
        'y-2xl':
          '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 -25px 50px -12px rgba(0, 0, 0, 0.25)',
        'y-3xl':
          '0 35px 60px -15px rgba(0, 0, 0, 0.3), 0 -35px 60px -15px rgba(0, 0, 0, 0.3)'
      },
      animation: {
        flicker: 'flicker 30s infinite',
        'blob-bounce': 'blob-bounce 7s infinite'
      },
      keyframes: {
        flicker: {
          '0%, 100%': {color: 'hsl(var(--foreground))'},
          '10%': {color: 'hsl(var(--primary))'},
          '20%': {color: 'hsl(var(--foreground))'},
          '25%': {color: 'hsl(var(--primary))'},
          '30%': {color: 'hsl(var(--foreground))'},
          '35%': {color: 'hsl(var(--primary))'},
          '40%': {color: 'hsl(var(--foreground))'},
          '50%': {color: 'hsl(var(--primary))'},
          '60%': {color: 'hsl(var(--foreground))'},
          '70%': {color: 'hsl(var(--primary))'},
          '80%': {color: 'hsl(var(--foreground))'},
          '90%': {color: 'hsl(var(--primary))'}
        },
        'blob-bounce': {
          '0%': {
            transform: 'translate(0px, 0px) scale(1)'
          },
          '33%': {
            transform: 'translate(30px, -50px) scale(1.1)'
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.9)'
          },
          '100%': {
            transform: 'translate(0px, 0px) scale(1)'
          }
        }
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            container: {
              center: true,
              padding: '2rem'
            },
            'max-width': '1400px',
            'code::before': {
              content: ''
            },
            'code::after': {
              content: ''
            },
            code: {
              fontFamily: 'Menlo',
              color: theme('colors.foreground'),
              fontWeight: theme('fontWeight.medium'),
              fontVariantLigatures: 'none',
              display: 'inline',
              backgroundColor: 'hsl(var(--muted))',
              padding: '2px 4px',
              borderRadius: '0.35rem',
              'font-size': theme('fontSize.sm')
            },
            'pre code': {
              fontFamily: 'Menlo',
              'font-size': theme('fontSize.sm')
            },
            'button code': {
              'font-size': theme('fontSize.xs')
            },
            'article hr': {
              borderStyle: 'dashed'
            },
            '--tw-prose-body': theme('colors.foreground'),
            '--tw-prose-headings': theme('colors.foreground'),
            '--tw-prose-bold': theme('colors.foreground'),
            '--tw-prose-lead': theme('colors.foreground'),
            '--tw-prose-link': theme('colors.foreground'),
            '--tw-prose-bullets': theme('colors.foreground'),
            '--tw-prose-pre-bg': 'transparent',
            '--tw-prose-pre-code': theme('colors.foreground'),
            '--tw-prose-links': theme('colors.primary.DEFAULT'),
            '--tw-prose-hr': theme('colors.muted.DEFAULT')
          }
        }
      })
    }
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')]
} satisfies Config
