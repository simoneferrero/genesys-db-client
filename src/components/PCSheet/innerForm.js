import React from 'react'
import PropTypes from 'prop-types'
import { playerCharacterData } from 'types/playersCharacters'
import { skillType } from 'types/skills'
import { factionType } from 'types/factions'
import { favorType } from 'types/favors'
import { weaponType } from 'types/weapons'

import * as yup from 'yup'

import { Form } from 'formik'

import Equipment from 'components/Equipment'
import Favors from 'components/Favors'
import FormButtons from 'components/FormButtons'
import Motivations from 'components/Motivations'
import Notes from 'components/Notes'
import PCSummary from 'components/PCSummary'
import Skills from 'components/Skills'
import Weapons from 'components/WeaponsSection'

import { StyledForm, StyledFormButtons, StyledSectionWrapper } from './styles'

const InnerForm = ({
  addFavor,
  addPlayerCharacterWeapon,
  editing,
  factions,
  handleSubmit,
  initialValues,
  isSubmitting,
  setEditing,
  setFieldValue,
  values,
  weapons,
}) => (
  <StyledForm as={Form} data-testid="pc-sheet" onSubmit={handleSubmit}>
    <StyledFormButtons
      as={FormButtons}
      disabled={isSubmitting}
      name="pc-sheet"
      showButtons={editing}
      setShowButtons={setEditing}
    />
    <StyledSectionWrapper
      as={PCSummary}
      editing={editing}
      hideLink
      isSubmitting={isSubmitting}
      sectionTitle="General"
      setFieldValue={setFieldValue}
      {...(editing ? values : initialValues)}
    />
    <StyledSectionWrapper
      as={Skills}
      editing={editing}
      initialSkills={initialValues.skills}
      isSubmitting={isSubmitting}
      onChange={setFieldValue}
      sectionTitle="Skills"
      skills={values.skills}
    />
    <StyledSectionWrapper
      as={Weapons}
      deletedWeapons={values.deletedWeapons}
      editing={editing}
      characterWeapons={editing ? values.weapons : initialValues.weapons}
      isCharacter
      handleSubmit={addPlayerCharacterWeapon}
      isPCSubmitting={isSubmitting}
      onWeaponChange={setFieldValue}
      sectionTitle="Weapons"
      showAdd
      skills={{}}
      weapons={weapons}
    />
    <StyledSectionWrapper
      as={Motivations}
      editing={editing}
      motivations={editing ? values.motivations : initialValues.motivations}
      isSubmitting={isSubmitting}
      setFieldValue={setFieldValue}
      sectionTitle="Motivations"
    />
    <StyledSectionWrapper
      as={Favors}
      editing={editing}
      factions={factions}
      favors={editing ? values.favors : initialValues.favors}
      handleSubmit={addFavor}
      isSubmitting={isSubmitting}
      setFieldValue={setFieldValue}
      sectionTitle="Favors"
    />
    <StyledSectionWrapper
      as={Equipment}
      editing={editing}
      isSubmitting={isSubmitting}
      equipment={editing ? values.equipment : initialValues.equipment}
      setFieldValue={setFieldValue}
      sectionTitle="Equipment"
    />
    <StyledSectionWrapper
      as={Notes}
      editing={editing}
      isSubmitting={isSubmitting}
      notes={editing ? values.notes : initialValues.notes}
      setFieldValue={setFieldValue}
      sectionTitle="Notes"
    />
  </StyledForm>
)

InnerForm.validationSchema = yup.object({
  // TODO: add other fields
  name: yup.string().required('required'),
})

InnerForm.propTypes = {
  /** Invoked when adding a favor */
  addFavor: PropTypes.func.isRequired,
  /** Invoked when adding a weapon */
  addPlayerCharacterWeapon: PropTypes.func.isRequired,
  /** Whether the buttons are in editing or static mode */
  editing: PropTypes.bool,
  /** Errors within the form */
  errors: PropTypes.object.isRequired,
  /** Factions data */
  factions: PropTypes.objectOf(factionType).isRequired,
  /** Form initial values */
  initialValues: PropTypes.object.isRequired,
  /** Invoked on submit */
  handleSubmit: PropTypes.func.isRequired,
  /** Whether the form is submitting */
  isSubmitting: PropTypes.bool,
  /** Changes the mode between editing and static */
  setEditing: PropTypes.func.isRequired,
  /** Changes the specified field value */
  setFieldValue: PropTypes.func.isRequired,
  /** Touched fields */
  touched: PropTypes.object.isRequired,
  /** Form values */
  values: PropTypes.shape({
    ...playerCharacterData,
    favors: PropTypes.objectOf(favorType).isRequired,
    skills: PropTypes.objectOf(skillType).isRequired,
    weapons: PropTypes.objectOf(weaponType).isRequired,
  }).isRequired,
  /** Weapons' data */
  weapons: PropTypes.objectOf(weaponType).isRequired,
}

export default InnerForm
