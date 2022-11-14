import 'dart:async';
// import 'dart:ffi';
import 'package:ama_timer/controllers/connect_controller.dart';
import 'package:ama_timer/pages/PlantingPage.dart';
import 'package:flutter/material.dart';
import 'package:circular_countdown_timer/circular_countdown_timer.dart';
import 'class/pomodoro_cycle.dart';
import 'class/pomodoro_config.dart';
import 'class/state/pomodoro.dart';
import 'components/primary_button.dart';
import 'controllers/wallect_controller.dart';
import 'package:provider/provider.dart';
import 'utils/constants.dart';
void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'AMA',
      theme: ThemeData(
        primarySwatch: Colors.grey,
      ),
      home: const MyHomePage(title: 'AMA'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({Key? key, this.title}) : super(key: key);

  final String? title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {

  int _tasks = 0;
  static const int minSec = 1; //60
  int _duration = 25 * minSec; 
  PomodoroState? nextState = PomodoroState.INIT;

  final CountDownController _controller = CountDownController();

  final PomodoroBase _pomodoro = PomodoroBase(Configuration()
        .setFocusMinutes(2) //25
        .setBreakMinutes(1) //1
        .setLongerBreakMinutes(1) //15
        .setCountUntilLongerBreak(3));

  //final Timer _polling;// = Timer();

  @override
  void initState() {
    super.initState();
    //final Timer _polling = 
    //Timer.periodic(const Duration(seconds: 1), (t) => _checkPomodoro(t));

  }

  // void _checkPomodoroStatus() {
  //       if (_pomodoro.shouldStartBreak()) {
  //         debugPrint('Should Break');
  //         _pomodoro.startBreak();
  //       }

  //       if (_pomodoro.shouldEndBreak()) {
  //         _pomodoro.endBreak();
  //         debugPrint('Breakended');
  //       }
  // }


  void _checkPomodoro() {
    setState(() {
      nextState = _pomodoro.nextState();
    });
      // _pomodoro.state;

      debugPrint('Next State: $nextState');
      if (nextState == null) 
      {
        _pomodoro.endBreak();
        _pomodoro.performs(); // resume
      }
      else

      if (nextState == PomodoroState.BREAK)
      {
        _pomodoro.startBreak();
      }
      else 
      if (nextState == PomodoroState.FOCUS)
      {
        _pomodoro.performs(); //?
      }
      else
      if (nextState == PomodoroState.FINISHED || nextState == PomodoroState.INIT)
      {
        _pomodoro.reset(); //?
        _pomodoro.performs(); 
      }

      _controllerSetup(nextState);
      //return nextState;
  }


  void _controllerSetup(PomodoroState? state ) {
    //PomodoroState state = _pomodoro.state;
    debugPrint('duration calc state: $state');
    int duration = 25 * minSec;
    switch (state) {
      case PomodoroState.BREAK:
      {
        duration = 5 * minSec;
      }
      break;
      case PomodoroState.LONG_BREAK:
      {
        duration = 15 * minSec;
      }
      break;
      default: //PomodoroState.FOCUS:
      {
        duration = 25 * minSec;
      }
      break;
    }
    _duration = duration;
    debugPrint('duration: $duration');
    //_controller.duration = duration; 
    _controller.restart(duration: duration);
  }

  int _getDuration() {
    return _duration;
  }

  Color _getStateColor() {
    // Display colour
    //return nextState;// _pomodoro.state; 

    if (nextState != PomodoroState.FOCUS)
    {
      return Colors.greenAccent[100]!;
    }
    else  
    {
      return Colors.blueAccent[100]!;
    }
    //return //nextState != PomodoroState.FOCUS ?  : Colors.blueAccent[100]!;

  }


  void _skipStep() {

    _checkPomodoro(); // changes staus eg: Long or short break or back to focus;


  }

  void _addTask() {
    print("next state:${nextState.toString()}");
    if (nextState != PomodoroState.BREAK && nextState != PomodoroState.LONG_BREAK) {
      setState(() {
      // This call to setState tells the Flutter framework that something has
      // changed in this State, which causes it to rerun the build method below
      // so that the display can reflect the updated values. If we changed
      // _counter without calling setState(), then the build method would not be
      // called again, and so nothing would appear to happen.
      _tasks++;
    });
    }
  }

  Widget _seedsWidget(){
    print("seed state:${_pomodoro.state}");

    return Row(
      crossAxisAlignment: CrossAxisAlignment.center,
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Row(
          crossAxisAlignment: CrossAxisAlignment.center,
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
        for( var i = 0 ; i < _tasks; i++ )
          if(i==_tasks-1 && _pomodoro.state==PomodoroState.FOCUS)
            Image.asset('images/seed_inactive.png',width: 30,height: 30)
            else Image.asset('images/seed_active.png',width: 30,height: 30,),
        ],
        ),
        if(_pomodoro.state==PomodoroState.LONG_BREAK )
          Container(
            alignment: Alignment.centerRight,
              child: PrimaryButton("Plant Now",(){
                _controller.pause();

                Navigator.push(context, MaterialPageRoute(builder: (context) => PlantingPage(_tasks)));
              },radius: 4,textColor: Color(0xffffffff),)),
        Text("state:${_pomodoro.state}")
      ],
    );
  }

  Widget _BottomOpction(
      Color color,
      String hashTag,
      String dis
      ){
    return Container(
      padding: EdgeInsets.all(8),
      child: Row(
        children: [
          Container(
            padding: EdgeInsets.all(8),
            decoration: BoxDecoration(
              color: Color(0xffD8D8D8),
                borderRadius: BorderRadius.all(Radius.circular(12))

            ),
            child: Row(
              children: [
                Container(
                  width: 10,
                  height: 10,
                  decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      color: color,
                  ),
                ),
                SizedBox(width: 8,),
                Text(hashTag),
              ],
            ),
          ),
          SizedBox(width: 15,),
          Text(dis)
        ],
      ),
    );
  }
  WalletController walletController = WalletController();
  PomodoroState _state = PomodoroState.INIT;
  final ConnectController _connectController = ConnectController();
  int n=1;
  @override
  Widget build(BuildContext context) {

    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title!),
        flexibleSpace: Container(
          alignment: Alignment.centerRight,
          child: walletController.isConnectWallet
              ? const SizedBox()
              :PrimaryButton("Connect",() async {
          try {
          walletController.connectWallet(context);
          } catch (e) {
          // logger.d(e);
          }
          }),
        ),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            ElevatedButton(onPressed: (){
              walletController.userFaucet(0, 4);
            },
                child: Text("UserFoucet")),
            _seedsWidget(),
            SizedBox(height: 30,),
            CircularCountDownTimer(
              // Countdown duration in Seconds.
              duration: _getDuration(),

              // Countdown initial elapsed Duration in Seconds.
              initialDuration: 0,

              // Controls (i.e Start, Pause, Resume, Restart) the Countdown Timer.
              controller: _controller,

              // Width of the Countdown Widget.
              width: MediaQuery.of(context).size.width / 3,

              // Height of the Countdown Widget.
              height: MediaQuery.of(context).size.height / 3,

              // Ring Color for Countdown Widget.
              ringColor: Colors.grey[300]!,

              // Ring Gradient for Countdown Widget.
              ringGradient: null,

              // Filling Color for Countdown Widget.
              fillColor: _getStateColor(),

              // Filling Gradient for Countdown Widget.
              fillGradient: null,

              // Background Color for Countdown Widget.
              // backgroundColor: Colors.blue[500],

              // Background Gradient for Countdown Widget.
              backgroundGradient: null,

              // Border Thickness of the Countdown Ring.
              strokeWidth: 5.0,

              // Begin and end contours with a flat edge and no extension.
              strokeCap: StrokeCap.round,

              // Text Style for Countdown Text.
              textStyle: const TextStyle(
                fontSize: 33.0,
                color: Colors.black,
                fontWeight: FontWeight.w900,
              ),

              // Format for the Countdown Text.
              textFormat: CountdownTextFormat.MM_SS,

              // Handles Countdown Timer (true for Reverse Countdown (max to 0), false for Forward Countdown (0 to max)).
              isReverse: true,

              // Handles Animation Direction (true for Reverse Animation, false for Forward Animation).
              isReverseAnimation: false,

              // Handles visibility of the Countdown Text.
              isTimerTextShown: true,

              // Handles the timer start.
              autoStart: false,

              // This Callback will execute when the Countdown Starts.
              onStart: () {
                // Here, do whatever you want
                debugPrint('Countdown Started');
                // _checkPomodoro();
                // _pomodoro.reset();
                // _pomodoro.performs();
              },

              // This Callback will execute when the Countdown Ends.
              onComplete: () {
                // Here, do whatever you want
                debugPrint('Countdown Ended');
                _checkPomodoro();
                _addTask();
                //_controllerSetup();

              },

              // This Callback will execute when the Countdown Changes.
              onChange: (String timeStamp) {
                PomodoroState state = _pomodoro.state;
                if(_state!= state) {
                  print("state changed to :$n:$state");
                  n++;
                  _state = state;
                }
                // Here, do whatever you want
                //debugPrint('Countdown Changed $timeStamp, state: $state.');
                //**_checkPomodoroStatus();
              },
            ),
            SizedBox(height: 30,),
            Container(
              color: Color(0xffD8D8D8),
              padding: EdgeInsets.all(10),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  Container(
                    width: 10,
                    height: 10,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      color: Color(0xffD511CE)
                    ),
                  ),
                  SizedBox(width: 8,),
                  Text("#Growth"),
                  Expanded(child: Center(child: Text("Read article for inspiration")))
                ],
              ),

            ),
            // SizedBox(height: 30,),
            _BottomOpction(Color(0xff1197D5),"#twitter","Write Thread"),
            _BottomOpction(Color(0xff11D514),"#desgin","Create visual"),
            _BottomOpction(Color(0xffD5B511),"#write","Expand into blog post"),
            _BottomOpction(Color(0xffD53A11),"#engage","Online with audience"),

          ],
        ),
      ),
      // floatingActionButton: FloatingActionButton(
      //   onPressed: () => _addTask,
      //   tooltip: 'Add Task',
      //   child: const Icon(Icons.add),
      // ), 

      floatingActionButton: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [


          const SizedBox(
            width: 30,
          ),
          _button(
            title: "Start",
            onPressed: () => _controller.start(),
          ),
          const SizedBox(
            width: 10,
          ),
          _button(
            title: "Pause",
            onPressed: () => _controller.pause(),
          ),
          const SizedBox(
            width: 10,
          ),
          _button(
            title: "Resume",
            onPressed: () => _controller.resume(),
          ),
          _button(
            title: "Skip",
            onPressed: () => {
              _skipStep()
              //Call _controller.restart(break or focus),
            }
                
          ),
          const SizedBox(
            width: 10,
          ),
          _button(
            title: "Restart",
            onPressed: () => {
              _pomodoro.reset(),
              _checkPomodoro(),
              //_controllerSetup(),
              //_controller.restart(duration: _duration)
            }
          ),
        ],
      ),
    );
  }

  Widget _button({required String title, VoidCallback? onPressed}) {
    return Expanded(
      child: ElevatedButton(
        style: ButtonStyle(
          backgroundColor: MaterialStateProperty.all(Colors.purple),
        ),
        onPressed: onPressed,
        child: Text(
          title,
          style: const TextStyle(color: Colors.white),
        ),
      ),
    );
  }
}