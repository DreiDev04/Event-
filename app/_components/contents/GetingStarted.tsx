import Image from "next/image";

const GetingStarted = () => {
  return (
    <>
      <div className="bg-gray-300 p-8 md:p-14 rounded-3xl mb-4">
        <p className="text-neutral-600 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          <span className="font-bold text-neutral-700">
            Managing group events has never been easier!
          </span>{" "}
          With Event++, your student group can stay organized and informed with
          a shared calendar that everyone can access. Event++ brings your group
          together in one seamless platform.
        </p>
        <Image
          src="/carousel/getting-started/add-tittle.png"
          alt="Macbook mockup from Aceternity UI"
          height="500"
          width="500"
          className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain py-10"
        />
      </div>
      <div className="bg-gray-300 p-8 md:p-14 rounded-3xl mb-4">
        <p className="text-neutral-600 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          <span className="font-bold text-neutral-700">
            Editing events has never been easier!
          </span>{" "}
          With Role Based Access, you can control who manages events. You can
          assign admin roles to different members of your group, ensuring
          everyone has the right level of access.
        </p>
        <Image
          src="/carousel/getting-started/edit-event.png"
          alt="Macbook mockup from Aceternity UI"
          height="500"
          width="500"
          className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain py-10"
        />
      </div>
      <div className="bg-gray-300 p-8 md:p-14 rounded-3xl mb-4">
        <p className="text-neutral-600 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          <span className="font-bold text-neutral-700">
            Easy deleting events!
          </span>{" "}
          With Event++, you can easily delete events that are no longer needed.
        </p>
        <Image
          src="/carousel/getting-started/delete-event.png"
          alt="Macbook mockup from Aceternity UI"
          height="500"
          width="500"
          className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain py-10"
        />
      </div>
      <div className="bg-gray-300 p-8 md:p-14 rounded-3xl mb-4">
        <p className="text-neutral-600 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          <span className="font-bold text-neutral-700">
            Create group or join existing group!
          </span>{" "}
          Every group has a unique code that you can use to join. You can also
          create a new group and invite your friends to join.
        </p>
        <Image
          src="/carousel/getting-started/join-create.png"
          alt="Macbook mockup from Aceternity UI"
          height="500"
          width="500"
          className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain py-10"
        />
      </div>
    </>
  );
};

export default GetingStarted;
