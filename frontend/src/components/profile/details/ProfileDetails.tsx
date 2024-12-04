import { Fragment, useState } from 'react';
import { Accordion, AccordionHeader, AccordionBody } from '@material-tailwind/react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import DetailsSection from './DetailsSection';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { Role, Status } from '@/common';
import { DialogUI } from '@/components/ui';
import { ProfileEditForm } from '../forms';
import usePersonnel from '@/hooks/usePersonnel';
import { useRoleContext } from '@/providers';

export const ProfileDetails = () => {
  const { personnel, profileData, updatePersonnel } = usePersonnel();
  const [openEditProfilePopUp, setOpenEditProfilePopUp] = useState(false);
  const { program, roles } = useRoleContext();
  const allowEditing = roles?.includes(Role.COORDINATOR);

  const [open, setOpen] = useState(1);

  const { generalInformation, contact, organizational, intakeRequirements } =
    profileData;
  const handleOpen = (value: number) => setOpen(open === value ? 0 : value);
  const sections = [
    {
      title: 'General Information',
      columns: generalInformation,
    },
    {
      title: 'Contact Information',
      columns: contact,
    },
    {
      title: 'Organization Information',
      columns: organizational,
    },
  ];

  if (intakeRequirements) {
    sections.unshift({
      title: 'Intake Requirements',
      columns: intakeRequirements,
    });
  }
  const handleOpenEditProfilePopUp = (e: React.MouseEvent<HTMLElement>) => {
    if (openEditProfilePopUp === false) {
      e.stopPropagation();
    }
    setOpenEditProfilePopUp(!openEditProfilePopUp);
  };

  return (
    <>
      <section className="bg-white">
        <div className="pt-6">
          <Accordion
            className="border-2 border-slate-950"
            placeholder={'Member Details'}
            open={open === 1}
            icon={
              open ? (
                <ChevronUpIcon className="cursor-pointer h-8 w-5 fill-[#606060]" />
              ) : (
                <ChevronDownIcon className="cursor-pointer h-8 w-5 fill-[#606060]" />
              )
            }
          >
            <AccordionHeader
              placeholder={'Member Details'}
              className="bg-grayBackground px-8"
              onClick={() => handleOpen(1)}
            >
              <div className=" w-full justify-between items-center flex lg:flex-row">
                <span>
                  {personnel?.status === Status.PENDING ? 'Applicant' : 'Member'}{' '}
                  Details
                </span>
                {allowEditing && (
                  <button
                    aria-label="edit profile"
                    onClick={handleOpenEditProfilePopUp}
                    className="z-20 flex text-primaryBlue flex-row items-center"
                  >
                    <PencilSquareIcon className="h-6 w-6" />
                    <span className="pl-2 font-normal underline text-sm">Edit</span>
                  </button>
                )}
              </div>
            </AccordionHeader>

            <AccordionBody>
              {sections.map((itm: any) => (
                <Fragment key={itm.title}>
                  <div className="px-16">
                    <DetailsSection title={itm.title} columns={itm.columns} />
                  </div>
                  <div className="w-full border border-b-1 border-gray-300 col-span-1 lg:col-span-5 my-8"></div>
                </Fragment>
              ))}
            </AccordionBody>
          </Accordion>
        </div>
      </section>
      {personnel && (
        <DialogUI
          open={openEditProfilePopUp}
          onClose={updatePersonnel}
          handleOpen={handleOpenEditProfilePopUp}
          title={'Edit Member Details'}
          style={'lg:w-2/3 xl:w-1/2'}
        >
          <ProfileEditForm
            personnel={personnel}
            open={openEditProfilePopUp}
            handleClose={handleOpenEditProfilePopUp}
            updatePersonnel={updatePersonnel}
            program={program}
          />
        </DialogUI>
      )}
    </>
  );
};
