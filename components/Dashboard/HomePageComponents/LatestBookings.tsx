import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const bookings = [
  {
    _id: "b1",
    name: "John Mwakyusa",
    email: "john.mwakyusa@gmail.com",
    phone: "+255712345678",
    service: "Corporate and Commercial Law",
    preferredDate: "2026-03-05",
    message: "Seeking legal advice on company registration.",
    status: "pending",
    createdAt: "2026-02-20",
  },
  {
    _id: "b2",
    name: "Asha Mohamed",
    email: "asha.mohamed@yahoo.com",
    phone: "+255754987321",
    service: "Labour Law",
    preferredDate: "2026-03-07",
    message: "Need assistance with an employment dispute.",
    status: "confirmed",
    createdAt: "2026-02-21",
  },
  {
    _id: "b3",
    name: "Peter Kimaro",
    email: "peter.kimaro@gmail.com",
    phone: "+255718223344",
    service: "Real Estate and Conveyancing",
    preferredDate: "2026-03-10",
    message: "Legal support for land transfer process.",
    status: "pending",
    createdAt: "2026-02-22",
  },
  {
    _id: "b4",
    name: "Neema Joseph",
    email: "neema.joseph@outlook.com",
    phone: "+255762998877",
    service: "Intellectual Property and Trademarks",
    preferredDate: "2026-03-12",
    message: "Trademark registration for my business.",
    status: "cancelled",
    createdAt: "2026-02-22",
  },
  {
    _id: "b5",
    name: "David Mushi",
    email: "david.mushi@gmail.com",
    phone: "+255713445566",
    service: "Litigation and Arbitration",
    preferredDate: "2026-03-15",
    message: "Representation in a commercial dispute.",
    status: "confirmed",
    createdAt: "2026-02-23",
  },
  {
    _id: "b6",
    name: "Fatma Hassan",
    email: "fatma.hassan@gmail.com",
    phone: "+255755667788",
    service: "Insurance Law",
    preferredDate: "2026-03-18",
    message: "Advice regarding an insurance claim.",
    status: "pending",
    createdAt: "2026-02-24",
  },
];

export default function LatestBookings() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-lg font-medium">Latest Bookings</h1>
      {bookings.slice(0, 5).map((booking) => (
        <Card key={booking._id} className="flex flex-col gap-2">
          <CardHeader>
            <CardTitle>{booking.service}</CardTitle>
            <div className="flex gap-4 items-center justify-between">
              <CardDescription>{booking.name}</CardDescription>
              <Badge
                variant={
                  booking.status === "pending"
                    ? "default"
                    : booking.status === "confirmed"
                      ? "secondary"
                      : "destructive"
                }
              >
                {booking.status}
              </Badge>
            </div>
          </CardHeader>

          <CardContent>
            <p className="text-xs leading-relaxed text-gray-500">
              {booking.message}
            </p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <p className="text-xs leading-relaxed text-gray-500">
              Booked on {booking.createdAt}
            </p>
            <Button>View</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
