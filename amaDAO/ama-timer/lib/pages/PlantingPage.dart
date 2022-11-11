import 'dart:math';

import 'package:ama_timer/components/primary_button.dart';
import 'package:flutter/material.dart';

class PlantingPage extends StatefulWidget {
  final int seeds;
  const PlantingPage(int this.seeds,{Key? key}) : super(key: key);

  @override
  State<PlantingPage> createState() => _PlantingPageState(seeds);
}

class _PlantingPageState extends State<PlantingPage> {
  int seed;
  _PlantingPageState(this.seed);


  Widget _seedsWidget(){
    seed = seed==0?8:seed;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Row(
          crossAxisAlignment: CrossAxisAlignment.center,
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            for( var i = 0 ; i <= min(seed,3); i++ )
              Image.asset('images/seed_active.png',width: 50,height: 50)
          ],
        ),
        if(seed>4) Row(
          crossAxisAlignment: CrossAxisAlignment.center,
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            for( var i = 5 ; i <= seed; i++ )
              Image.asset('images/seed_active.png',width: 50,height: 50)
          ],
        ),

      ],
    );
  }


  @override
  Widget build(BuildContext context) {

    return Scaffold(
      body: Container(
        child: Column(
          children: [

            Container(
                alignment: Alignment.centerRight,
                child: IconButton(onPressed: ()=>Navigator.pop(context), icon: Icon(Icons.cancel))),
            Text("You've got $seed trees to plant",
              style: const TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.bold
              ),),
            SizedBox(height: 12,),
            Stack(
              alignment: Alignment.center,
              children: [
                Container(
                  margin: EdgeInsets.only(top: 30),
                  child: SizedBox(
                      width: 300,
                      child: Image.asset('images/rectangle.png')),
                ),
                Container(
                    margin: EdgeInsets.only(bottom: 30),
                    child: _seedsWidget()),

              ],
            ),
            Container(
              width: MediaQuery.of(context).size.width,
              color: Color(0xFFD8D8D8),
              child: Column(
                children: [
                  Text("Text Sponcor"),
                  Image.network("file:///home/venkey/Downloads/navigation-design-graph-top-level.png")

                ],

              ),
            ),

            PrimaryButton("Plant", () { },
              background: Color(0xFF7ED321),
              radius: 4,
              // padding: EdgeInsets.symmetric(vertical: 8,horizontal: 28),
            )
          ],
        ),
      ),

    );
  }

}
