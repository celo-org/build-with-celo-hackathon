import 'package:flutter/material.dart';

class ChartViewAppBar extends StatelessWidget {
  const ChartViewAppBar({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Container(
          decoration: BoxDecoration(
            gradient: LinearGradient(
              colors: [
                Colors.green[600]!,
                Colors.green[600]!,
                Colors.white,
                Colors.green[600]!,
                Colors.green[600]!,
              ],
            ),
            borderRadius: BorderRadius.circular(20),
          ),
          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
          child: const Text(
            '⭐️ Carbon Negative Citizen! ⭐️',
            style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12),
          ),
        ),
        const Spacer(),
        const Text('10 ECO₂'),
        const SizedBox(width: 10),
        const Text('🌎 L4'),
      ],
    );
  }
}
