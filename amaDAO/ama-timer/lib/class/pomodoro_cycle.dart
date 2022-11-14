import 'pomodoro_config.dart';
import 'break_counter.dart';
import 'state/pomodoro.dart';

///interfaces 

abstract class PomodoroBase extends BreakSupport {
  /// The factory constructor.
  factory PomodoroBase(Configuration configuration) =>
      PomodoroImpl.from(configuration);

  /// Returns the pomodoro state
  PomodoroState get state;// => this._state;

  PomodoroState? nextState(){return null;}

  /// Starts a pomodoro set and returns [true] as long as this pomodoro set is ongoing.
  bool performs();

  /// Stops the pomodoro.
  void stop();

  /// Resets the pomodoro.
  void reset();
}

abstract class BreakSupport {
  // bool shouldStartBreak();

  bool isBreaking();

  // bool shouldEndBreak();

  ///  Starts the break.
  void startBreak();

  ///  Ends the break.
  void endBreak();
}


///implementation

class PomodoroImpl implements PomodoroBase {
  final Configuration _configuration;

  // final Stopwatch _stopwatch = new Stopwatch();

  final BreakCounter _counter = BreakCounter.newInstance();

  PomodoroState _state = PomodoroState.INIT;


  /// Returns the new instance of PomodoroImpl based on the configuration passed as an argument.
  PomodoroImpl.from(Configuration configuration)
      : this._configuration = configuration;

  /// Returns the pomodoro state
  PomodoroState get state => this._state;

  @override
  bool performs() {
    if (this._state == PomodoroState.INIT) {
      // this._stopwatch.start();
      this._state = PomodoroState.FOCUS;
    }
    return true;
  }

  @override
  void reset() {
    // this._stopwatch.reset();
    this._counter.reset();
    this._state = PomodoroState.INIT;
  }

  @override
  void stop() {
    // this._stopwatch.stop();
    this._state = PomodoroState.PAUSED;
  }

  @override
  PomodoroState? nextState(){
    // On ending a current state
    // considers the configuration with the current state and returns the next state to trigger
  
    print('Current State: ${this._state}');

    switch(_state) { 
      case PomodoroState.FOCUS: { 
          // statements logic for which break 
          //  BREAK,
          //  LONG_BREAK,
          return PomodoroState.BREAK;
          // caller should call startBreak to determined which
      } 

      case PomodoroState.BREAK:  
      case PomodoroState.LONG_BREAK: { 
          endBreak();
          return PomodoroState.FOCUS;
      } 
      
      case PomodoroState.PAUSED: { 
        // this case should not be called
         return null; // resume what the prior state was eg: PAUSED BREAK i.e. resume
      } 

      case PomodoroState.FINISHED: { 
        // this case should not be called
         return PomodoroState.INIT; // resume what the prior state was eg: PAUSED BREAK i.e. resume
      } 
        
      default: { 
          //On INIT case
          return PomodoroState.FOCUS;
      }
    } 
} 


  @override
  bool isBreaking() {
    return this._state == PomodoroState.BREAK ||
        this._state == PomodoroState.LONG_BREAK;
  }


  @override
  void startBreak() {
    if (this._counter.count >= this._configuration.getCountUntilLongerBreak()) {
      this._counter.increment();
      this._state = PomodoroState.LONG_BREAK;
    } else {
      this._counter.increment();
      this._state = PomodoroState.BREAK;
    }

    // this._restartStopwatch();
  }

  @override
  void endBreak() {
    if (this._state == PomodoroState.LONG_BREAK) {
      this._counter.reset();
      this._state = PomodoroState.FINISHED;
    } else {
      this._state = PomodoroState.FOCUS;
    }

    // this._restartStopwatch();
  }

  // void _restartStopwatch() {
  //   this._stopwatch.reset();
  //   this._stopwatch.start();
  // }
}