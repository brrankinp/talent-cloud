import { Fragment, useEffect } from 'react';
import { FormSection } from '../components/FormSection';
import type {
  FormSection as FormSectionType,
  IntakeFormValues,
} from '../constants/types';
import { useFormikContext } from 'formik';

import { useIntakeForm } from '@/hooks/useIntakeForm';
import { FormField } from '../fields/FormField';
import { MultiSelectGroup } from '../components/MultiSelectFieldGroup';
import {
  handleFilterProgram,
  intakeFormComponents,
  renderIntakeFormComponent,
} from '../utils/helpers';

export const Experiences = ({ sections }: { sections: FormSectionType[] }) => {
  const {
    setFieldValue,
    values: {
      firstChoiceFunction,
      functions,
      secondChoiceFunction,
      thirdChoiceFunction,
      firstChoiceSection,
      secondChoiceSection,
      thirdChoiceSection,
    },
  } = useFormikContext<IntakeFormValues>();

  useEffect(() => {
    if (!functions || (functions?.length === 0 && firstChoiceFunction)) {
      setFieldValue('functions', [firstChoiceFunction]);
    } else {
      const functionSet = functions && functions.length > 0 && new Set(functions);
      if (
        functionSet &&
        !functionSet.has(firstChoiceFunction) &&
        firstChoiceFunction !== ''
      ) {
        setFieldValue('functions', [
          ...Array.from(functionSet),
          firstChoiceFunction,
        ]);
      }
    }
  }, [firstChoiceFunction]);

  useEffect(() => {
    if (!functions || (functions?.length === 0 && secondChoiceFunction)) {
      setFieldValue('functions', [secondChoiceFunction]);
    } else {
      const functionSet = functions && functions.length > 0 && new Set(functions);
      if (
        functionSet &&
        secondChoiceFunction &&
        !functionSet.has(secondChoiceFunction) &&
        secondChoiceFunction !== ''
      ) {
        setFieldValue('functions', [
          ...Array.from(functionSet),
          secondChoiceFunction,
        ]);
      }
    }
  }, [secondChoiceFunction]);

  useEffect(() => {
    if (!functions || (functions?.length === 0 && thirdChoiceFunction)) {
      setFieldValue('functions', [thirdChoiceFunction]);
    } else {
      const functionSet = functions && functions.length > 0 && new Set(functions);
      if (
        thirdChoiceFunction &&
        functionSet &&
        !functionSet.has(thirdChoiceFunction) &&
        thirdChoiceFunction !== ''
      ) {
        setFieldValue('functions', [
          ...Array.from(functionSet),
          thirdChoiceFunction,
        ]);
      }
    }
  }, [thirdChoiceFunction]);

  const { getOptions } = useIntakeForm();
  const { values } = useFormikContext<IntakeFormValues>();

  // set description based on program
  let description;
  if (values.program === 'all') {
    description =
      'The EMCR and BCWS CORE Team program streams operate very differently with distinct sections and/or roles. For this step, please carefully review their requirements in the blue banners as you proceed. Your responses will help us match your expertise and skillset to suitable roles.';
  } else if (values.program === 'bcws') {
    description =
      'The BCWS CORE Team program stream operates with distinct sections and roles. For this step, please carefully review their requirements in the blue banners as you proceed. Your responses will help us match your expertise and skillset to suitable roles.';
  } else if (values.program === 'emcr') {
    description =
      'The EMCR CORE Team program stream operates with distinct sections. For this step, please carefully review their requirements in the blue banners as you proceed. Your responses will help us match your expertise and skillset to suitable roles.';
  } else {
    description = '';
  }
  return (
    <div>
      <div className="text-sm py-6">{description}</div>

      <div className="pb-24">
        {sections
          .filter(
            (section) =>
              values.program &&
              section.program &&
              handleFilterProgram(section, values.program.toString()),
          )
          .map(
            (section) =>
              section.fields && (
                <FormSection
                  section={section}
                  key={section.name}
                  header={section.header}
                >
                  <>
                    {section.fields.map((fieldItm) => (
                      <Fragment key={fieldItm.name}>
                        {intakeFormComponents.includes(fieldItm.type) ? (
                          <div className="col-span-2">
                            {renderIntakeFormComponent(fieldItm)}
                          </div>
                        ) : fieldItm.type === 'multiselect-group' ? (
                          <div className="col-span-2">
                            {fieldItm.label}

                            <MultiSelectGroup field={fieldItm} />
                          </div>
                        ) : (
                          <div
                            className={
                              fieldItm.colSpan
                                ? `col-span-${fieldItm.colSpan}`
                                : 'col-span-1'
                            }
                          >
                            <FormField
                              key={fieldItm.name}
                              {...fieldItm}
                              disabled={
                                (fieldItm.name === 'secondChoiceFunction' &&
                                  !firstChoiceFunction) ||
                                (fieldItm.name === 'thirdChoiceFunction' &&
                                  !secondChoiceFunction) ||
                                (fieldItm.name === 'secondChoiceSection' &&
                                  !firstChoiceSection) ||
                                (fieldItm.name === 'thirdChoiceSection' &&
                                  !secondChoiceSection)
                              }
                              options={
                                fieldItm.options && fieldItm.options.length === 0
                                  ? getOptions(fieldItm.name).map((option) => ({
                                      ...option,
                                      disabled: [
                                        firstChoiceFunction,
                                        secondChoiceFunction,
                                        thirdChoiceFunction,
                                      ].includes(option.value.toString()),
                                    }))
                                  : fieldItm.options?.map((option) => ({
                                      ...option,
                                      disabled: [
                                        firstChoiceSection,
                                        secondChoiceSection,
                                        thirdChoiceSection,
                                      ].includes(option.value.toString()),
                                    }))
                              }
                            />
                          </div>
                        )}
                      </Fragment>
                    ))}
                  </>
                </FormSection>
              ),
          )}
      </div>
    </div>
  );
};
