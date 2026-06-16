import { Source, Title, Subheading, Unstyled } from '@storybook/blocks';
import clsx from 'clsx';
import type { FC } from 'react';
import { DESCRIPTION_CLASS } from '../constants';

import '@/src/styles.css';

const CROW_COLORS: Readonly<Record<string, Record<number, string>>> = {
  primary: {
    50: '240 243 255',
    100: '200 211 247',
    200: '158 176 240',
    300: '117 144 235',
    400: '76 110 229',
    500: '40 82 228',
    600: '21 59 191',
    700: '16 44 143',
    800: '10 30 95',
    900: '4 13 48',
  },
  secondary: {
    50: '245 250 250',
    100: '226 243 243',
    200: '198 231 231',
    300: '158 214 217',
    400: '124 203 207',
    500: '0 186 188',
    600: '0 155 157',
    700: '0 124 125',
    800: '0 93 94',
    900: '0 62 63',
  },
  success: {
    50: '236 253 249',
    100: '209 250 240',
    200: '167 243 224',
    300: '110 231 201',
    400: '52 211 171',
    500: '16 185 143',
    600: '5 150 114',
    700: '4 120 91',
    800: '6 95 73',
    900: '6 78 60',
  },
  warning: {
    50: '255 246 224',
    100: '254 233 178',
    200: '254 222 142',
    300: '254 212 107',
    400: '253 199 63',
    500: '253 187 19',
    600: '216 158 13',
    700: '162 119 6',
    800: '108 78 2',
    900: '54 39 0',
  },
  error: {
    50: '255 235 236',
    100: '250 209 212',
    200: '237 161 166',
    300: '227 120 127',
    400: '219 87 96',
    500: '213 28 41',
    600: '167 5 16',
    700: '117 0 8',
    800: '87 0 6',
    900: '71 0 5',
  },
  gray: {
    50: '248 250 252',
    100: '241 245 249',
    200: '226 232 240',
    300: '203 213 225',
    400: '148 163 184',
    500: '100 116 139',
    600: '71 85 105',
    700: '51 65 85',
    800: '30 41 59',
    900: '15 23 42',
  },
  sky: {
    50: '235 248 255',
    100: '190 231 255',
    200: '158 219 255',
    300: '126 208 255',
    400: '93 196 255',
    500: '61 184 255',
    600: '51 153 212',
    700: '41 123 170',
    800: '31 92 128',
    900: '20 61 85',
  },
  violet: {
    50: '243 233 253',
    100: '217 182 252',
    200: '198 146 250',
    300: '180 110 249',
    400: '161 73 247',
    500: '142 37 246',
    600: '118 31 205',
    700: '118 31 205',
    800: '71 19 123',
    900: '47 12 82',
  },
  flamingo: {
    50: '254 234 242',
    100: '253 189 216',
    200: '252 155 196',
    300: '252 122 176',
    400: '251 89 157',
    500: '250 56 137',
    600: '208 47 114',
    700: '167 37 91',
    800: '125 28 69',
    900: '83 19 46',
  },
};

const SHADES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

const ColorDocument: FC = () => {
  return (
    <>
      <Title>Colors</Title>

      <p className={DESCRIPTION_CLASS}>
        crow-ui ships a well-defined set of default colors across 9 palettes. Every palette exposes
        10 shades (50–900) as CSS custom properties, so you can override any value at runtime
        without rebuilding.
      </p>
      <Subheading>Default Colors</Subheading>
      <Unstyled>
        <div className="crow:flex crow:gap-4">
          <div className="crow:flex crow:flex-col crow:shrink-0 crow:gap-4">
            <div className="crow:flex-1 crow:font-p1-medium crow:font-bold">Colors / Shades</div>
            {Object.keys(CROW_COLORS).map((name) => (
              <div
                key={name}
                className="crow:flex-1 crow:font-p1-medium crow:font-bold"
              >
                {name}
              </div>
            ))}
          </div>
          <div className="crow:flex crow:flex-col crow:gap-4">
            <div className="crow:flex crow:items-center crow:gap-4">
              {SHADES.map((shade) => (
                <div
                  key={shade}
                  className="crow:flex-1 crow:font-p1-medium crow:text-center"
                >
                  {shade}
                </div>
              ))}
            </div>
            {Object.keys(CROW_COLORS).map((name) => (
              <div
                key={name}
                className="crow:flex crow:items-center crow:gap-4"
              >
                {SHADES.map((shade) => (
                  <div
                    key={shade}
                    className="crow:flex-1 crow:size-7 crow:rounded-lg"
                    style={{ backgroundColor: `rgb(${CROW_COLORS[name]?.[shade] ?? ''})` }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
        <p className={clsx('crow:mt-10', DESCRIPTION_CLASS)}>
          Every palette has 10 shades — 50 is lightest, 900 is darkest.
        </p>
        <div className="crow:flex crow:gap-4 crow:justify-center crow:my-5">
          {SHADES.map((shade) => (
            <div
              key={shade}
              className="crow:flex crow:flex-col crow:items-center crow:font-p2-medium"
            >
              <div
                className="crow:size-7 crow:rounded-lg"
                style={{ backgroundColor: `rgb(${CROW_COLORS['primary']?.[shade] ?? ''})` }}
              />
              {shade}
            </div>
          ))}
        </div>
      </Unstyled>
      <Subheading>How to override colors</Subheading>
      <p className={DESCRIPTION_CLASS}>
        Redefine any <code>--crow-color-&#123;palette&#125;-&#123;shade&#125;</code> CSS variable in
        your global stylesheet. Values are space-separated RGB numbers.
      </p>
      <Source
        language="css"
        code={`:root {
  /* swap primary to your brand color */
  --crow-color-primary-500: 99 102 241;
}`}
      />
    </>
  );
};

export default ColorDocument;
