import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

// using opens sans right now, but the font in the behance case study is Sf pro Display

/*
 headline 6 - Appbar title  (got to find this)
 headline 5 - not used.
 headline 4 - Semi bold header
 headline 3 - Bold Header (sub headings)
 headline 2 - Large bold header (main headings)
 headline 1 = not used.

 bodytext 1 - non bold paragh
 bodytext 2 = bold paragh

 caption - for captions

 labelLarge, labelMedium, labelSmall - not used
 bodyLarge, bodyMedium, bodySmall - not used

 subtitle 1 - not used
 subtitle 2 - not used

*/

class AppTheme {
  AppTheme._();

  static final ThemeData lightTheme = ThemeData(
    appBarTheme: AppBarTheme(
      // color: Colors.white,
      backgroundColor: Colors.white,
      shadowColor: Colors.transparent.withOpacity(.1),
      iconTheme: const IconThemeData(
        // color: Color.fromRGBO(255, 0, 92, 1),
        color: Colors.black,
      ),
      toolbarTextStyle: TextTheme(
              headline1: GoogleFonts.openSans(
                  color: Colors.black,
                  fontSize: 20,
                  fontWeight: FontWeight.w600))
          .bodyText2,
      titleTextStyle: TextTheme(
              headline1: GoogleFonts.openSans(
                  color: const Color.fromRGBO(255, 0, 92, 1),
                  fontSize: 20,
                  fontWeight: FontWeight.w600))
          .headline6,
    ),

    // main colors
    primaryColor: const Color(0xFF34C759),
    highlightColor: const Color(0xFF007aff),

    // background colors
    backgroundColor: Colors.white,
    scaffoldBackgroundColor: Colors.white,
    cardColor: Colors.grey[100],

    // other colors
    splashColor: Colors.pink,
    hoverColor: Colors.black,
    errorColor: const Color.fromRGBO(255, 0, 92, 1),
    indicatorColor: Colors.pink[100],
    hintColor: Colors.grey,
    canvasColor: Colors.white,

    // icon theme
    iconTheme: const IconThemeData(
      color: Colors.grey,
    ),

    textTheme: TextTheme(
      // need to caption style (currently using default caption style)
      headline1: GoogleFonts.openSans(color: Colors.black, fontSize: 30),
      headline2: GoogleFonts.openSans(
          color: Colors.black, fontSize: 30, fontWeight: FontWeight.w700),
      headline3: GoogleFonts.openSans(
          color: Colors.black, fontSize: 22, fontWeight: FontWeight.w800),
      headline4: GoogleFonts.openSans(
          color: Colors.black, fontSize: 30, fontWeight: FontWeight.w500),
      headline5: GoogleFonts.openSans(
          color: Colors.black, fontSize: 28, fontWeight: FontWeight.w700),
      bodyText1: GoogleFonts.openSans(
          color: Colors.black, fontSize: 16, fontWeight: FontWeight.w500),
      bodyText2: GoogleFonts.openSans(
          color: Colors.black, fontSize: 16, fontWeight: FontWeight.w700),
      subtitle1: GoogleFonts.openSans(
          color: const Color.fromRGBO(164, 164, 178, 1),
          fontSize: 14,
          fontWeight: FontWeight.w700),
      subtitle2: GoogleFonts.openSans(
          color: Colors.black, fontSize: 21, fontWeight: FontWeight.w300),
      labelMedium: GoogleFonts.openSans(
          color: Colors.grey, fontSize: 16, fontWeight: FontWeight.w900),
    ),
    colorScheme: ColorScheme.fromSwatch().copyWith(
      brightness: Brightness.light,
    ),
  );

  static final ThemeData darkTheme = ThemeData(
    appBarTheme: AppBarTheme(
      backgroundColor: Colors.black54,
      shadowColor: Colors.transparent.withOpacity(.1),
      iconTheme: const IconThemeData(
        color: Colors.white,
      ),
      toolbarTextStyle: TextTheme(
              headline1: GoogleFonts.openSans(
                  color: Colors.white,
                  fontSize: 20,
                  fontWeight: FontWeight.w600))
          .bodyText2,
      titleTextStyle: TextTheme(
              headline1: GoogleFonts.openSans(
                  color: Colors.white,
                  fontSize: 20,
                  fontWeight: FontWeight.w600))
          .headline6,
    ),

    // main colors
    primaryColor: const Color(0xFF34C759),
    highlightColor: const Color(0xFF007aff),

    // background colors
    backgroundColor: Colors.black54,
    scaffoldBackgroundColor: Colors.black54,
    cardColor: Colors.grey[100],

    // other colors
    splashColor: Colors.pink,
    hoverColor: Colors.white,
    errorColor: Colors.white,
    indicatorColor: Colors.pink[800],
    hintColor: Colors.grey,
    canvasColor: Colors.black,

    // icon theme
    iconTheme: const IconThemeData(
      color: Colors.white,
    ),

    textTheme: TextTheme(
      caption:
          const TextStyle(color: Colors.white, fontWeight: FontWeight.w600),
      headline1: GoogleFonts.openSans(color: Colors.white, fontSize: 30),
      headline2: GoogleFonts.openSans(
          color: Colors.white, fontSize: 30, fontWeight: FontWeight.w700),
      headline3: GoogleFonts.openSans(
          color: Colors.white, fontSize: 22, fontWeight: FontWeight.w800),
      headline4: GoogleFonts.openSans(
          color: Colors.white, fontSize: 30, fontWeight: FontWeight.w500),
      headline5: GoogleFonts.openSans(
          color: Colors.white, fontSize: 28, fontWeight: FontWeight.w700),
      bodyText1: GoogleFonts.openSans(
          color: Colors.white, fontSize: 16, fontWeight: FontWeight.w500),
      bodyText2: GoogleFonts.openSans(
          color: Colors.white, fontSize: 16, fontWeight: FontWeight.w700),
      subtitle1: GoogleFonts.openSans(
          color: const Color.fromRGBO(164, 164, 178, 1),
          fontSize: 14,
          fontWeight: FontWeight.w700),
      subtitle2: GoogleFonts.openSans(
          color: Colors.white, fontSize: 21, fontWeight: FontWeight.w300),
      labelMedium: GoogleFonts.openSans(
          color: Colors.grey, fontSize: 16, fontWeight: FontWeight.w500),
    ),
    colorScheme: ColorScheme.fromSwatch().copyWith(
      brightness: Brightness.dark,
    ),
  );
}
