import db from "@/lib/utils/db";
import { PassengerPostsCarousel } from "./PassengerPostsCarousel";
import * as m from "@/paraglide/messages.js";

export default async function PassengerPostsSection() {
  const posts = await db.passengerTripRequest.findMany({
    where: {
      status: "ACTIVE",
      departureDateTo: {
        gte: new Date(),
      },
    },
    include: {
      passenger: {
        select: {
          id: true,
          name: true,
          profileImg: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 20,
  });

  if (!posts || posts.length === 0) return null;

  const serializedPosts = posts.map((post) => ({
    id: post.id,
    from: post.from,
    to: post.to,
    departureDateFrom: post.departureDateFrom.toISOString(),
    departureDateTo: post.departureDateTo.toISOString(),
    preferredTimeSlot: post.preferredTimeSlot,
    seatsNeeded: post.seatsNeeded,
    description: post.description,
    preferences: post.preferences as Array<{ id: string; en: string; ka: string }>,
    passenger: post.passenger,
  }));

  return (
    <section className="py-16">
      <div className="container mb-8 relative z-0">
        <div className="text-center">
          <span className="inline-block px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full mb-3">
            {m.next_light_shad_glow()}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
            {m.sad_proud_oryx_click()}
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            {m.mild_nimble_robin_cheer()}
          </p>
        </div>
      </div>
      
      <PassengerPostsCarousel posts={serializedPosts} />
    </section>
  );
}

