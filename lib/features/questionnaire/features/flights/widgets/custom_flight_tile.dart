import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class CustomFlightTile extends StatefulWidget {
  const CustomFlightTile({
    required this.title,
    required this.subtitle,
    required this.count,
    super.key,
  });

  final String title;
  final String subtitle;
  final int count;

  @override
  State<CustomFlightTile> createState() => _CustomFlightTileState();
}

class _CustomFlightTileState extends State<CustomFlightTile> {
  int count = 0;

  @override
  Widget build(BuildContext context) {
    return ListTile(
      leading: Container(
        decoration: BoxDecoration(
            border: Border.all(
              color: Theme.of(context).primaryColor,
            ),
            color: Theme.of(context).primaryColor,
            borderRadius: const BorderRadius.all(Radius.circular(10))),
        height: 50,
        width: 50,
        child: const Center(
          child: FaIcon(
            FontAwesomeIcons.ticket,
            color: Colors.white,
          ),
        ),
      ),
      title: Text(
        widget.title,
        style: Theme.of(context).textTheme.bodyText2,
      ),
      subtitle: Text(
        widget.subtitle,
        overflow: TextOverflow.ellipsis,
        style: Theme.of(context).textTheme.subtitle1,
      ),
      trailing: Wrap(
        children: [
          GestureDetector(
            onTap: () {
              // should not allow the count to go to negative
              if (count != 0) {
                setState(() {
                  count--;
                });
              }
            },
            child: Container(
              decoration: BoxDecoration(
                  border: Border.all(
                    color: Theme.of(context).primaryColor,
                  ),
                  // color: Theme.of(context).primaryColor,
                  borderRadius: const BorderRadius.all(Radius.circular(10))),
              child: const Icon(Icons.remove),
            ),
          ),
          const SizedBox(width: 20),
          Text(
            count.toString(),
            style: Theme.of(context).textTheme.headline6,
          ),
          const SizedBox(width: 20),
          GestureDetector(
            onTap: () {
              setState(() {
                count++;
              });
            },
            child: Container(
              decoration: BoxDecoration(
                  border: Border.all(
                    color: Theme.of(context).primaryColor,
                  ),
                  borderRadius: const BorderRadius.all(Radius.circular(10))),
              child: const Icon(Icons.add),
            ),
          ),
        ],
      ),
    );
  }
}
