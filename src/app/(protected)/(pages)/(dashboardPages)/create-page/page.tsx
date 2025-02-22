import React, { Suspense } from "react";
import CreatePageSkeleton from "./_components/CreatePage/CreatePageSkeleton";

const CreatePage = () => {
  return (
    <main className=" w-full h-full pt-6">
      <Suspense fallback={<CreatePageSkeleton></CreatePageSkeleton>}>
        <RenderPage></RenderPage>
      </Suspense>
    </main>
  );
};

export default CreatePage;
