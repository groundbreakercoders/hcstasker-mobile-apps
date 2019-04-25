import Moment from "moment";

function timeHelper(
  dayOffset = 0,
  hourOffset = 0,
  minuteOffset = 0,
  dateOnly: boolean = false
) {
  return Moment()
    .add(dayOffset, "day")
    .add(hourOffset, "hour")
    .add(minuteOffset, "minute")
    .local()
    .format(dateOnly ? "YYYY-MM-DD" : "YYYY-MM-DDTHH:mm:ss");
}

const tasker = {
  rating: 4.93,
  acceptedTripsCount: 5,
  cancelledTripsCount: 1,
  totalTripsCount: 6,
  fiveStarTripsCount: 4,
  completedTrips: [
    {
      payout: 23.33,
      durationMinutes: 24,
      start: timeHelper()
    },
    {
      payout: 153.25,
      durationMinutes: 71,
      start: timeHelper(0, 0, -30)
    },
    {
      payout: 7.82,
      durationMinutes: 15,
      start: timeHelper(0, -1, 43)
    },
    {
      payout: 13.01,
      durationMinutes: 13,
      start: timeHelper(-1, 4, 23)
    },
    {
      payout: 3.76,
      durationMinutes: 5,
      start: timeHelper(-2, -4, 43)
    }
  ],
  totalPayoutAmount: 16.77,
  payoutStatements: [
    {
      amount: 13.01,
      date: timeHelper(-1, 4, 23, true)
    },
    {
      amount: 3.76,
      date: timeHelper(-2, -4, 43, true)
    }
  ]
};

export default tasker;
