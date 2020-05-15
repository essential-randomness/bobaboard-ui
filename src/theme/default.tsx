const DefaultTheme: ThemeProperties = {
  LAYOUT_BOARD_BACKGROUND_COLOR: "#2f2f30",
  LAYOUT_SIDEMENU_BACKGROUND_COLOR: "#2f2f30",
  LAYOUT_HEADER_BACKGROUND_COLOR: "#131518",
  LAYOUT_BOARD_SIDEBAR_BACKGROUND_COLOR: "#1c1c1c",
  POPOVER_DEFAULT_BACKGROUND: "#1c1c1c",
  POST_HEADER_DATE_COLOR: "#2f2f30",
  POST_BACKGROUND_COLOR: "white",
  NEW_POST_COLOR: "#f96680",
  NEW_CONTRIBUTION_COLOR: "#f96680",
  NEW_COMMENT_COLOR: "#f96680",
  BORDER_RADIUS_REGULAR: "25px",
};

export default DefaultTheme;

export interface ThemeProperties {
  LAYOUT_BOARD_BACKGROUND_COLOR: string;
  POPOVER_DEFAULT_BACKGROUND: string;
  POST_HEADER_DATE_COLOR: string;
  POST_BACKGROUND_COLOR: string;
  NEW_POST_COLOR: string;
  NEW_CONTRIBUTION_COLOR: string;
  NEW_COMMENT_COLOR: string;
  LAYOUT_SIDEMENU_BACKGROUND_COLOR: string;
  LAYOUT_HEADER_BACKGROUND_COLOR: string;
  LAYOUT_BOARD_SIDEBAR_BACKGROUND_COLOR: string;
  BORDER_RADIUS_REGULAR: string;
}
