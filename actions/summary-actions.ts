"use server";

import { getDbConnection } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function deleteSummaryAction({
  summaryId,
}: {
  summaryId: string;
}) {
  try {
    const user = await currentUser();
    const userId = user?.id;

    if (!userId) {
      throw new Error("User not found");
    }

    const sql = await getDbConnection();

    const result = await sql`
      DELETE FROM pdf_summaries 
      WHERE id = ${summaryId}
      AND user_id = ${userId}
      RETURNING id;
    `;
    if (result.length > 0) {
      revalidatePath("/dashboard");
      return { success: true };
    }

    return { success: false };
  } catch (error) {
    console.error("Error deleting summary", error);
    return { success: false };
  }
}

export async function getSummariesAction(userId: string) {
  try {
    const sql = await getDbConnection();

    const summaries = await sql`
      SELECT * FROM pdf_summaries
      WHERE user_id = ${userId}
      ORDER By created_at DESC;
    `;
    
    return summaries;
  } catch (error) {
    console.error("Error getting summaries", error);
  }
}

export async function getSummaryById(id: string){
  try {
    const sql = await getDbConnection();

    const [summary] = await sql`
      SELECT * From pdf_summaries where id=${id}
    `;

    return summary;
  } catch (error) {
    console.error("Error while getting a summary", error);
    
  }
}