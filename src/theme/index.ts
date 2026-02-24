/**
 * Ant Design Theme Configuration
 *
 * Customizes Ant Design components to match CloudBees branding
 * and provide a professional enterprise appearance.
 */

import type { ThemeConfig } from 'antd';
import { colors, typography } from './tokens';

/**
 * Light theme configuration
 */
export const lightTheme: ThemeConfig = {
  token: {
    // Color tokens
    colorPrimary: colors.primary[500],
    colorSuccess: colors.success[500],
    colorWarning: colors.warning[500],
    colorError: colors.error[500],
    colorInfo: colors.primary[500],

    // Typography
    fontFamily: typography.fontFamily.base,
    fontSize: 14,
    fontSizeHeading1: 38,
    fontSizeHeading2: 30,
    fontSizeHeading3: 24,
    fontSizeHeading4: 20,
    fontSizeHeading5: 16,

    // Border radius
    borderRadius: 6,
    borderRadiusLG: 8,
    borderRadiusSM: 4,

    // Layout
    colorBgContainer: '#ffffff',
    colorBgLayout: colors.neutral[50],
    colorBgElevated: '#ffffff',

    // Text colors
    colorText: colors.neutral[900],
    colorTextSecondary: colors.neutral[600],
    colorTextTertiary: colors.neutral[500],
    colorTextQuaternary: colors.neutral[400],

    // Border colors
    colorBorder: colors.neutral[300],
    colorBorderSecondary: colors.neutral[200],

    // Component-specific
    controlHeight: 32,
    controlHeightLG: 40,
    controlHeightSM: 24,

    // Spacing
    padding: 16,
    paddingLG: 24,
    paddingSM: 12,
    paddingXS: 8,
    paddingXXS: 4,

    margin: 16,
    marginLG: 24,
    marginSM: 12,
    marginXS: 8,
    marginXXS: 4,

    // Line height
    lineHeight: 1.5715,
    lineHeightHeading1: 1.21,
    lineHeightHeading2: 1.27,
    lineHeightHeading3: 1.33,
    lineHeightHeading4: 1.4,
    lineHeightHeading5: 1.5,

    // Motion
    motionUnit: 0.1,
    motionBase: 0,
    motionEaseInOut: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    motionEaseOut: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
  },

  components: {
    Layout: {
      headerBg: '#ffffff',
      headerColor: colors.neutral[900],
      headerHeight: 64,
      headerPadding: '0 24px',
      siderBg: '#ffffff',
      footerBg: colors.neutral[50],
      footerPadding: '24px 50px',
    },

    Menu: {
      itemBg: 'transparent',
      itemColor: colors.neutral[700],
      itemHoverBg: colors.primary[50],
      itemHoverColor: colors.primary[600],
      itemSelectedBg: colors.primary[100],
      itemSelectedColor: colors.primary[600],
      iconSize: 18,
    },

    Button: {
      primaryColor: '#ffffff',
      borderRadius: 6,
      controlHeight: 32,
      controlHeightLG: 40,
      controlHeightSM: 24,
    },

    Card: {
      headerBg: 'transparent',
      headerFontSize: 16,
      headerFontSizeSM: 14,
      borderRadiusLG: 8,
    },

    Table: {
      headerBg: colors.neutral[50],
      headerColor: colors.neutral[900],
      borderRadius: 6,
      borderRadiusLG: 8,
    },

    Badge: {
      dotSize: 6,
      textFontSize: 12,
      textFontSizeSM: 10,
    },

    Tag: {
      borderRadiusSM: 4,
      fontSize: 12,
      lineHeight: 20 / 12,
    },
  },
};

/**
 * Dark theme configuration (for future implementation)
 */
export const darkTheme: ThemeConfig = {
  ...lightTheme,
  token: {
    ...lightTheme.token,

    // Dark theme color overrides
    colorBgContainer: colors.neutral[900],
    colorBgLayout: colors.neutral[950],
    colorBgElevated: colors.neutral[800],

    colorText: colors.neutral[50],
    colorTextSecondary: colors.neutral[300],
    colorTextTertiary: colors.neutral[400],
    colorTextQuaternary: colors.neutral[500],

    colorBorder: colors.neutral[700],
    colorBorderSecondary: colors.neutral[800],
  },

  components: {
    ...lightTheme.components,

    Layout: {
      ...lightTheme.components?.Layout,
      headerBg: colors.neutral[900],
      headerColor: colors.neutral[50],
      siderBg: colors.neutral[900],
      footerBg: colors.neutral[950],
    },

    Menu: {
      ...lightTheme.components?.Menu,
      itemColor: colors.neutral[300],
      itemHoverBg: colors.primary[900],
      itemHoverColor: colors.primary[400],
      itemSelectedBg: colors.primary[800],
      itemSelectedColor: colors.primary[400],
    },

    Card: {
      ...lightTheme.components?.Card,
      headerBg: 'transparent',
    },

    Table: {
      ...lightTheme.components?.Table,
      headerBg: colors.neutral[800],
      headerColor: colors.neutral[50],
    },
  },
};

/**
 * Default theme (light mode)
 */
export const theme = lightTheme;
