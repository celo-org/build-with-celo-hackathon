import 'dart:async';
import 'package:flutter/material.dart';
import 'package:circular_countdown_timer/circular_countdown_timer.dart';
import 'class/pomodoro_cycle.dart';
import 'class/pomodoro_config.dart';
import 'class/state/pomodoro.dart';

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
  final int _duration = 2*60; //5*60;
  int _tasks = 1;

  final CountDownController _controller = CountDownController();

  final PomodoroBase _pomodoro = PomodoroBase(Configuration()
        .setFocusMinutes(2) //25
        .setBreakMinutes(1) //1
        .setLongerBreakMinutes(1) //15
        .setCountUntilLongerBreak(4));

  //final Timer _polling;// = Timer();

  @override
  void initState() {
    super.initState();
    //final Timer _polling = 
    //Timer.periodic(const Duration(seconds: 1), (t) => _checkPomodoro(t));

  }

  // void _checkPomodoro(Timer t) {
  //     int tick = t.tick;
  //     debugPrint('Countdown Changed $tick');
  void _checkPomodoro() {
      //while (_pomodoro.performs()) {
        if (_pomodoro.shouldStartBreak()) { //} && _pomodoro.state != PomodoroState.BREAK) {
          debugPrint('Should Break');
          _pomodoro.startBreak();
        }
        //debugPrint('On Break');

        //if (_pomodoro.shouldEndBreak() && _pomodoro.state == PomodoroState.BREAK) {

         // while (_pomodoro.isBreaking()) {
         //   debugPrint('Breaking');
            if (_pomodoro.shouldEndBreak()) {
              _pomodoro.endBreak();
              debugPrint('Breakended');
            }
          // }
       // }
      //}

  }

  void _addTask() {
    setState(() {
      // This call to setState tells the Flutter framework that something has
      // changed in this State, which causes it to rerun the build method below
      // so that the display can reflect the updated values. If we changed
      // _counter without calling setState(), then the build method would not be
      // called again, and so nothing would appear to happen.
      _tasks++;
    });
  }


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title!),
      ),
      body: Center(
        child: CircularCountDownTimer(
          // Countdown duration in Seconds.
          duration: _duration,

          // Countdown initial elapsed Duration in Seconds.
          initialDuration: 0,

          // Controls (i.e Start, Pause, Resume, Restart) the Countdown Timer.
          controller: _controller,

          // Width of the Countdown Widget.
          width: MediaQuery.of(context).size.width / 2,

          // Height of the Countdown Widget.
          height: MediaQuery.of(context).size.height / 2,

          // Ring Color for Countdown Widget.
          ringColor: Colors.grey[300]!,

          // Ring Gradient for Countdown Widget.
          ringGradient: null,

          // Filling Color for Countdown Widget.
          fillColor: Colors.blueAccent[100]!,

          // Filling Gradient for Countdown Widget.
          fillGradient: null,

          // Background Color for Countdown Widget.
          backgroundColor: Colors.blue[500],

          // Background Gradient for Countdown Widget.
          backgroundGradient: null,

          // Border Thickness of the Countdown Ring.
          strokeWidth: 20.0,

          // Begin and end contours with a flat edge and no extension.
          strokeCap: StrokeCap.round,

          // Text Style for Countdown Text.
          textStyle: const TextStyle(
            fontSize: 33.0,
            color: Colors.white,
            fontWeight: FontWeight.bold,
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
            _pomodoro.reset();
            _pomodoro.performs();
          },

          // This Callback will execute when the Countdown Ends.
          onComplete: () {
            // Here, do whatever you want
            debugPrint('Countdown Ended');
          },

          // This Callback will execute when the Countdown Changes.
          onChange: (String timeStamp) {
            PomodoroState state = _pomodoro.state;
            // Here, do whatever you want
            debugPrint('Countdown Changed $timeStamp, state: $state.');
            _checkPomodoro();
          },
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
          const SizedBox(
            width: 10,
          ),
          _button(
            title: "Restart",
            onPressed: () => _controller.restart(duration: _duration),
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