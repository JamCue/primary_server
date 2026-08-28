import {z} from 'zod';

// `when` splits a musician's jams into the Jams tab's two sections:
// 'upcoming' (scheduledAt in the future, soonest first) for the highlighted
// next-jam card, 'past' (scheduledAt already passed, most recent first) for
// the recent-jams list. Omitted, every jam is returned, most recent first.
const listJamsQuerySchema = z.object({
  when: z.enum(['upcoming', 'past']).optional(),
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(20),
});

export default listJamsQuerySchema;
