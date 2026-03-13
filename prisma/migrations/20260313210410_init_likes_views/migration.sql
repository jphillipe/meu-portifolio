/*
  Warnings:

  - A unique constraint covering the columns `[sessionId,projectId]` on the table `View` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "View_sessionId_projectId_key" ON "View"("sessionId", "projectId");
