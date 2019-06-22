import React from 'react'
import PropTypes from 'prop-types'
import {
  characterCriticalInjuryType,
  criticalInjuryType,
} from 'types/criticalInjuries'
import { playerCharacterData } from 'types/playersCharacters'
import { factionType } from 'types/factions'
import { favorType } from 'types/favors'
import { skillType } from 'types/skills'
import { talentType } from 'types/talents'
import { weaponType } from 'types/weapons'

import * as yup from 'yup'

import { Form } from 'formik'

import CriticalInjuries from 'components/CriticalInjuriesSection'
import Equipment from 'components/Equipment'
import Favors from 'components/Favors'
import FormButtons from 'components/FormButtons'
import Motivations from 'components/Motivations'
import Notes from 'components/Notes'
import PCSummary from 'components/PCSummary'
import Skills from 'components/Skills'
import Talents from 'components/TalentsSection'
import Weapons from 'components/WeaponsSection'
import XPBadges from 'components/XPBadges'

import { StyledForm, StyledFormButtons, StyledSectionWrapper } from './styles'

const InnerForm = ({
  addFavor,
  addPlayerCharacterCriticalInjury,
  addPlayerCharacterTalent,
  addPlayerCharacterWeapon,
  criticalInjuries,
  editing,
  factions,
  handleSubmit,
  isSubmitting,
  resetForm,
  setEditing,
  setFieldValue,
  values,
  talents,
  weapons,
}) => (
  <StyledForm as={Form} data-testid="pc-sheet" onSubmit={handleSubmit}>
    <StyledFormButtons
      as={FormButtons}
      disabled={isSubmitting}
      handleCancel={resetForm}
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
      {...values}
    />
    <StyledSectionWrapper
      as={Skills}
      editing={editing}
      isSubmitting={isSubmitting}
      onChange={setFieldValue}
      sectionTitle="Skills"
      skills={values.skills}
    />
    <StyledSectionWrapper
      as={Weapons}
      deletedWeapons={values.deletedWeapons}
      editing={editing}
      characterWeapons={values.weapons}
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
      as={Talents}
      characterTalents={values.talents}
      editing={editing}
      handleSubmit={addPlayerCharacterTalent}
      isCharacter
      isSubmitting={isSubmitting}
      setFieldValue={setFieldValue}
      sectionTitle="Talents"
      showAdd
      talents={talents}
    />
    <StyledSectionWrapper
      as={CriticalInjuries}
      characterCriticalInjuries={values.critical_injuries}
      criticalInjuries={criticalInjuries}
      deletedCriticalInjuries={values.deletedCriticalInjuries}
      editing={editing}
      handleSubmit={addPlayerCharacterCriticalInjury}
      isCharacter
      isPCSubmitting={isSubmitting}
      onCriticalInjuryChange={setFieldValue}
      sectionTitle="Critical Injuries"
    />
    <StyledSectionWrapper
      as={Motivations}
      editing={editing}
      motivations={values.motivations}
      isSubmitting={isSubmitting}
      setFieldValue={setFieldValue}
      sectionTitle="Motivations"
    />
    <StyledSectionWrapper
      as={Favors}
      editing={editing}
      factions={factions}
      favors={values.favors}
      handleSubmit={addFavor}
      isSubmitting={isSubmitting}
      setFieldValue={setFieldValue}
      sectionTitle="Favors"
    />
    <StyledSectionWrapper
      as={Equipment}
      editing={editing}
      isSubmitting={isSubmitting}
      equipment={values.equipment}
      setFieldValue={setFieldValue}
      sectionTitle="Equipment"
    />
    <StyledSectionWrapper
      as={Notes}
      editing={editing}
      isSubmitting={isSubmitting}
      notes={values.notes}
      setFieldValue={setFieldValue}
      sectionTitle="Notes"
    />
    <XPBadges
      editing={editing}
      setFieldValue={setFieldValue}
      xpAvailable={values.xp.available}
      xpTotal={values.xp.total}
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
  /** Invoked when adding a critical injury */
  addPlayerCharacterCriticalInjury: PropTypes.func.isRequired,
  /** Invoked when adding a talent */
  addPlayerCharacterTalent: PropTypes.func.isRequired,
  /** Invoked when adding a weapon */
  addPlayerCharacterWeapon: PropTypes.func.isRequired,
  /** Critical injuries data */
  criticalInjuries: PropTypes.arrayOf(criticalInjuryType).isRequired,
  /** Whether the buttons are in editing or static mode */
  editing: PropTypes.bool,
  /** Errors within the form */
  errors: PropTypes.object.isRequired,
  /** Factions data */
  factions: PropTypes.objectOf(factionType).isRequired,
  /** Invoked on submit */
  handleSubmit: PropTypes.func.isRequired,
  /** Whether the form is submitting */
  isSubmitting: PropTypes.bool,
  /** Resets the form to initial values */
  resetForm: PropTypes.func.isRequired,
  /** Changes the mode between editing and static */
  setEditing: PropTypes.func.isRequired,
  /** Changes the specified field value */
  setFieldValue: PropTypes.func.isRequired,
  /** Talents data */
  talents: PropTypes.objectOf(talentType).isRequired,
  /** Touched fields */
  touched: PropTypes.object.isRequired,
  /** Form values */
  values: PropTypes.shape({
    ...playerCharacterData,
    critical_injuries: PropTypes.objectOf(characterCriticalInjuryType)
      .isRequired,
    favors: PropTypes.objectOf(favorType).isRequired,
    skills: PropTypes.objectOf(skillType).isRequired,
    talents: PropTypes.objectOf(talentType).isRequired,
    weapons: PropTypes.objectOf(weaponType).isRequired,
  }).isRequired,
  /** Weapons' data */
  weapons: PropTypes.objectOf(weaponType).isRequired,
}

export default InnerForm
