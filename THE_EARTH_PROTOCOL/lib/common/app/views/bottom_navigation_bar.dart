import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:sustain/features/chart/views/chart_view.dart';
import 'package:sustain/features/pledge/views/pledge_view.dart';

import '../../../features/marketplace/marketplace_view.dart';

class BottomNav extends StatefulWidget {
  const BottomNav({super.key});

  @override
  State<BottomNav> createState() => _BottomNavState();
}

class _BottomNavState extends State<BottomNav> {
  int _selectedIndex = 0;
  static const List<Widget> _widgetOptions = <Widget>[
    ChartView(),
    MarketPlaceView(),
    PledgeView(),
    PledgeView(),
    PledgeView(),
  ];

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: _widgetOptions.elementAt(_selectedIndex),
      ),
      bottomNavigationBar: BottomNavigationBar(
        backgroundColor: Colors.white,
        showSelectedLabels: false,
        showUnselectedLabels: false,
        unselectedItemColor: Colors.grey,
        selectedItemColor: Colors.black,
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(
            icon: FaIcon(FontAwesomeIcons.chartPie),
            label: 'Carbon Chart',
          ),
          BottomNavigationBarItem(
            icon: FaIcon(FontAwesomeIcons.cartShopping),
            label: 'Market',
          ),
          BottomNavigationBarItem(
            icon: FaIcon(FontAwesomeIcons.leaf),
            label: 'Buy Credits',
          ),
          BottomNavigationBarItem(
            icon: FaIcon(FontAwesomeIcons.ticket),
            label: 'Events',
          ),
          BottomNavigationBarItem(
            icon: FaIcon(FontAwesomeIcons.planeDeparture),
            label: 'Travel',
          ),
        ],
        currentIndex: _selectedIndex,
        onTap: _onItemTapped,
        type: BottomNavigationBarType.fixed,
      ),
    );
  }
}
