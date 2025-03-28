import { Chip } from '@material-tailwind/react';

/**
 * Possible Columns:
 * - Section (with choice designation) - `section`
 * - Role Name (BCWS) - `role`
 * - Experience Level (Coordinator / Logistics view) - `experience`
 * - Delete Action (Coordinator / Member view) - `delete`
 */
export const MemberItemList = ({
  preferences,
  columns,
  data,
  displayEmpty = false,
}: {
  preferences?: {
    first?: string;
    second?: string;
    third?: string;
  };
  columns: { key: string; name: string; size?: string }[];
  data: {
    id: string | number;
    [key: string]: string | number;
  }[];
  displayEmpty?: boolean;
}) => {
  const firstChoiceSection = preferences?.first;
  const secondChoiceSection = preferences?.second;
  const thirdChoiceSection = preferences?.third;

  const Header = ({
    columns,
  }: {
    columns: { key: string; name: string; size?: string }[];
  }) => (
    <div className="flex flex-row p-2 bg-grayBackground">
      {columns.map((c) => (
        <div
          className={`${c.size ? `basis-${c.size}` : `basis-1-${columns.length}`}`}
          key={c.name}
        >
          <span className="text-blue-900 font-bold">{c.name}</span>
        </div>
      ))}
    </div>
  );

  const EmptyChoiceSection = ({ section }: { section: string }) => (
    <div className="border-t-2 border-gray-100">
      <div className="flex flex-row py-2 items-center justify-between">
        <div className="basis-1/3 text-darkGray px-2">
          <p className="flex flex-row gap-2">
            {section}
            {section === firstChoiceSection && (
              <Chip value="1st Choice" className="rounded-full capitalize" />
            )}
            {section === secondChoiceSection && (
              <Chip
                value="2nd Choice"
                className="rounded-full capitalize bg-infoBannerLight text-ministry"
              />
            )}
            {section === thirdChoiceSection && (
              <Chip
                value="3rd Choice"
                className="rounded-full capitalize bg-green-100 text-ministry"
              />
            )}
          </p>
        </div>
      </div>
    </div>
  );

  const NoSkills = () => (
    <div className="flex flex-col py-8 gap-2">
      <div className="text-center">
        <h6 className="text-sm font-bold text-primaryBlue">No Skills Shown</h6>
      </div>
      <div className="text-center">
        <p className="text-sm">You have not indicated any skills here.</p>
      </div>
    </div>
  );

  return (
    <>
      <section>
        <Header columns={columns} />
        {firstChoiceSection &&
          !data.map((d) => d.section).includes(firstChoiceSection) && (
            <EmptyChoiceSection section={firstChoiceSection} />
          )}
        {secondChoiceSection &&
          !data.map((d) => d.section).includes(secondChoiceSection) && (
            <EmptyChoiceSection section={secondChoiceSection} />
          )}
        {thirdChoiceSection &&
          !data.map((d) => d.section).includes(thirdChoiceSection) && (
            <EmptyChoiceSection section={thirdChoiceSection} />
          )}
        {displayEmpty === true && data.length === 0 && <NoSkills />}
        {data.map((row, i) => {
          // sort by section name
          const notFirstRowOfSection =
            i !== 0 && row.section === data[i - 1].section;
          return (
            <>
              <div
                key={i}
                className={`flex flex-row p-2 items-center justify-between ${!notFirstRowOfSection && 'border-t-2 border-gray-100'}`}
              >
                {columns.map((c) => (
                  <div
                    key={c.key}
                    className={`${c.size ? `basis-${c.size}` : `basis-1-${columns.length}`} text-darkGray`}
                  >
                    {c.key === 'section' && (
                      <p className="flex flex-row gap-2">
                        {notFirstRowOfSection ? '' : row.section}
                        {!notFirstRowOfSection &&
                          row.section === firstChoiceSection && (
                            <Chip
                              value="1st Choice"
                              className="rounded-full capitalize"
                            />
                          )}
                        {!notFirstRowOfSection &&
                          row.section === secondChoiceSection && (
                            <Chip
                              value="2nd Choice"
                              className="rounded-full bg-warningBannerLight text-ministry capitalize"
                            />
                          )}
                        {!notFirstRowOfSection &&
                          row.section === thirdChoiceSection && (
                            <Chip
                              value="3rd Choice"
                              className="rounded-full bg-green-100 text-ministry capitalize"
                            />
                          )}
                      </p>
                    )}
                    {c.key === 'role' && (
                      <p>{row[columns[1].key as keyof typeof row]}</p>
                    )}
                    {/* {c.key === 'experience' && <></>} TODO */}
                    {c.key === 'language' && <p>{row['language']}</p>}
                    {c.key === 'proficiency' && <p>{row['proficiency']}</p>}
                    {c.key === 'tool' && <p>{row['tool']}</p>}
                    {c.key === 'certification' && <p>{row['certification']}</p>}
                    {c.key === 'expiry' && <p>{row['expiry']}</p>}
                    {c.key === 'courseId' && <p>{row['courseId']}</p>}
                    {c.key === 'courseTitle' && <p>{row['courseTitle']}</p>}
                    {c.key === 'completedDate' && <p>{row['completedDate']}</p>}
                  </div>
                ))}
              </div>
            </>
          );
        })}
      </section>
    </>
  );
};
