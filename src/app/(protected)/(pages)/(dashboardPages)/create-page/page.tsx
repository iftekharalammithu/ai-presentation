import React, { Suspense } from "react";
import CreatePageSkeleton from "./_components/CreatePage/CreatePageSkeleton";
import RenderPage from "./_components/RenderPage";

const CreatePage = () => {
  return (
    <main className=" w-full h-full pt-6">
      <Suspense fallback={<CreatePageSkeleton />}>
        <RenderPage></RenderPage>
      </Suspense>
    </main>
  );
};

export default CreatePage;
