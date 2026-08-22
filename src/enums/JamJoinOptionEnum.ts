// Only one join mechanism is implemented today (a generated `joinCode`
// shareable as a QR code or a plain link) — kept as an enum, rather than a
// hardcoded literal on JamType, so a future mechanism (e.g. invite-email-only)
// slots in without reshaping every layer that reads it.
enum JamJoinOptionEnum {
  QR_AND_LINK = 'qr_and_link',
}

export default JamJoinOptionEnum;
