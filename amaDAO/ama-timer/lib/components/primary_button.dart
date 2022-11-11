import 'dart:async';
import 'package:flutter/material.dart';

class PrimaryButton extends StatelessWidget {
  final String text;
  final Color background ;
  final double radius;
  final EdgeInsetsGeometry padding;
  final double margin;
  final GestureTapCallback onTap;
  final Color textColor;
  const PrimaryButton(
      this.text,
      this.onTap,
      {Key? key,
        this.background = const Color(0xff2ec955),
        this.radius = 8,
        this.padding = const EdgeInsets.all(8),
        this.margin = 10,
        this.textColor = const Color(0xff000000),
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      child: Container(
        padding: padding,
        margin: EdgeInsets.all(margin),
        decoration: BoxDecoration(
          color: background,
          borderRadius: BorderRadius.all(Radius.circular(radius)),

        ),
        child: Text(text,
          style: TextStyle(
            fontWeight: FontWeight.w600,
            color:textColor
          ),),
      ),
    );
  }
}
