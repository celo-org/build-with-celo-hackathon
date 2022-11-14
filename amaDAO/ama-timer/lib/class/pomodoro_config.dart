
abstract class Configuration {
  /// The factory constructor.
  factory Configuration() => BasicConfiguration.newInstance();

  /// Sets the [focusMinutes] and returns this instance.
  Configuration setFocusMinutes(int focusMinutes);

  /// Sets the [breakMinutes] and returns this instance.
  Configuration setBreakMinutes(int breakMinutes);

  /// Sets the [longerBreakMinutes] and returns this instance.
  Configuration setLongerBreakMinutes(int longerBreakMinutes);

  /// Sets the [countUntilLongerBreak] and returns this instance.
  Configuration setCountUntilLongerBreak(int countUntilLongerBreak);

  /// Returns the focus minutes.
  int getFocusMinutes();

  /// Returns the break minutes.
  int getBreakMinutes();

  /// Returns the longer break minutes.
  int getLongerBreakMinutes();

  /// Returns the count until longer break.
  int getCountUntilLongerBreak();
}




class BasicConfiguration implements Configuration {
  /// Returns the new instance of [BasicConfiguration].
  BasicConfiguration.newInstance();

  int _focusMinutes = 25;

  /// The break minutes
  int _breakMinutes = 5;

  /// The longer break minutes
  int _longerBreakMinutes = 15;

  /// The count until longer break
  int _countUntilLongerBreak = 4;

  @override
  int getBreakMinutes() => this._breakMinutes;

  @override
  int getFocusMinutes() => this._focusMinutes;

  @override
  int getCountUntilLongerBreak() => this._countUntilLongerBreak;

  @override
  int getLongerBreakMinutes() => this._longerBreakMinutes;

  @override
  Configuration setBreakMinutes(int breakMinutes) {
    this._breakMinutes = breakMinutes;
    return this;
  }

  @override
  Configuration setFocusMinutes(int focusMinutes) {
    this._focusMinutes = focusMinutes;
    return this;
  }

  @override
  Configuration setCountUntilLongerBreak(int countUntilLongerBreak) {
    this._countUntilLongerBreak = countUntilLongerBreak;
    return this;
  }

  @override
  Configuration setLongerBreakMinutes(int longerBreakMinutes) {
    this._longerBreakMinutes = longerBreakMinutes;
    return this;
  }
}