import { useEffect, useMemo, useState } from 'react'
import AppLayout from '../components/layout/AppLayout'
import { useLanguage } from '../i18n/LanguageContext'
import { fetchUsers } from '../services/userService'
import {
  assignStudentsToGroup,
  createGroup,
  fetchGroupStudents,
  fetchMyGroups,
  removeStudentFromGroup,
  updateGroup,
} from '../services/groupService'

function normalizeGroup(group) {
  return {
    ...group,
    id: group.id,
    name: group.groupName || group.name || '',
    description: group.description || '',
    memberCount: group.memberCount || 0,
    learnerIds: [],
  }
}

export default function LearnerGroupsPage() {
  const { t } = useLanguage()
  const [groups, setGroups] = useState([])
  const [learners, setLearners] = useState([])
  const [formState, setFormState] = useState({ name: '', description: '' })
  const [editingGroupId, setEditingGroupId] = useState(null)
  const [selectedGroupId, setSelectedGroupId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  const loadGroups = async (preferredId = null) => {
    const data = await fetchMyGroups()
    const mapped = (Array.isArray(data) ? data : []).map(normalizeGroup)
    setGroups(mapped)
    setSelectedGroupId((current) => {
      const requested = preferredId ?? current
      return mapped.some((group) => group.id === requested) ? requested : mapped[0]?.id ?? null
    })
    return mapped
  }

  useEffect(() => {
    let active = true
    setLoading(true)
    Promise.all([fetchMyGroups(), fetchUsers()])
      .then(([groupData, userData]) => {
        if (!active) return
        const mapped = (Array.isArray(groupData) ? groupData : []).map(normalizeGroup)
        setGroups(mapped)
        setLearners(Array.isArray(userData) ? userData : [])
        setSelectedGroupId(mapped[0]?.id ?? null)
      })
      .catch((err) => { if (active) setError(err?.message || 'Unable to load learner groups.') })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [])

  useEffect(() => {
    if (!selectedGroupId) return
    let active = true
    fetchGroupStudents(selectedGroupId)
      .then((members) => {
        if (!active) return
        const ids = (Array.isArray(members) ? members : []).map((member) => member.studentId)
        setGroups((current) => current.map((group) => group.id === selectedGroupId
          ? { ...group, learnerIds: ids, memberCount: ids.length }
          : group))
      })
      .catch((err) => { if (active) setError(err?.message || 'Unable to load group members.') })
    return () => { active = false }
  }, [selectedGroupId])

  const selectedGroup = useMemo(
    () => groups.find((group) => group.id === selectedGroupId) || groups[0] || null,
    [groups, selectedGroupId]
  )

  const handleFormChange = (event) => {
    const { name, value } = event.target
    setFormState((current) => ({ ...current, [name]: value }))
  }

  const resetForm = () => {
    setFormState({ name: '', description: '' })
    setEditingGroupId(null)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const trimmedName = formState.name.trim()
    const trimmedDescription = formState.description.trim()
    if (!trimmedName) return

    setSaving(true)
    setError('')
    setNotice('')
    try {
      if (editingGroupId) {
        await updateGroup(editingGroupId, { name: trimmedName, description: trimmedDescription })
        await loadGroups(editingGroupId)
        setNotice('Learner group updated successfully.')
      } else {
        const created = await createGroup({ name: trimmedName, description: trimmedDescription })
        await loadGroups(created?.id)
        setNotice('Learner group created successfully.')
      }
      resetForm()
    } catch (err) {
      setError(err?.message || 'Unable to save learner group.')
    } finally {
      setSaving(false)
    }
  }

  const handleEditGroup = (group) => {
    setEditingGroupId(group.id)
    setFormState({ name: group.name, description: group.description })
    setSelectedGroupId(group.id)
  }

  const handleToggleLearner = async (learnerId) => {
    if (!selectedGroupId || saving) return
    const currentlyAssigned = selectedGroup?.learnerIds?.includes(learnerId)
    setSaving(true)
    setError('')
    setNotice('')
    try {
      if (currentlyAssigned) await removeStudentFromGroup(selectedGroupId, learnerId)
      else await assignStudentsToGroup(selectedGroupId, [learnerId])

      const members = await fetchGroupStudents(selectedGroupId)
      const ids = (Array.isArray(members) ? members : []).map((member) => member.studentId)
      setGroups((current) => current.map((group) => group.id === selectedGroupId
        ? { ...group, learnerIds: ids, memberCount: ids.length }
        : group))
      setNotice(currentlyAssigned ? 'Learner removed from group.' : 'Learner assigned to group.')
    } catch (err) {
      setError(err?.message || 'Unable to update group membership.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <AppLayout section={t('groups', 'pageTitle')}>
      <div className="learner-group-page">
        <div className="page-header learner-group-header">
          <div><h1>{t('groups', 'pageTitle')}</h1><p>{t('groups', 'pageSubtitle')}</p></div>
        </div>
        {loading && <p role="status">Loading learner groups…</p>}
        {error && <p className="um-error" role="alert">{error}</p>}
        {notice && <p className="um-success" role="status">{notice}</p>}

        <div className="learner-groups-layout">
          <aside className="learner-group-sidebar">
            <div className="learner-group-sidebar-header"><h2>{t('groups', 'groupsHeader')}</h2><span>{groups.length}</span></div>
            {groups.map((group) => (
              <button key={group.id} type="button" className={`learner-group-item ${selectedGroup?.id === group.id ? 'selected' : ''}`} onClick={() => setSelectedGroupId(group.id)}>
                <strong>{group.name}</strong>
                <span>{group.memberCount ?? group.learnerIds.length} {t('groups', 'selectedCount')}</span>
              </button>
            ))}
          </aside>

          <main className="learner-group-main">
            <form className="learner-group-form" onSubmit={handleSubmit}>
              <div className="learner-group-form-header">
                <h2>{editingGroupId ? t('groups', 'editTitle') : t('groups', 'createTitle')}</h2>
                {editingGroupId && <button type="button" className="learner-group-cancel-btn" onClick={resetForm}>{t('groups', 'cancel')}</button>}
              </div>
              <label><span>{t('groups', 'groupName')}</span><input name="name" value={formState.name} onChange={handleFormChange} placeholder={t('groups', 'groupNamePlaceholder')} /></label>
              <label><span>{t('groups', 'description')}</span><textarea name="description" value={formState.description} onChange={handleFormChange} placeholder={t('groups', 'descriptionPlaceholder')} rows="4" /></label>
              <div className="learner-group-form-actions"><button disabled={saving} type="submit" className="learner-group-primary-btn">{editingGroupId ? t('groups', 'updateButton') : t('groups', 'createButton')}</button></div>
            </form>

            {selectedGroup && (
              <div className="learner-group-assignment-panel">
                <div className="learner-group-assignment-header">
                  <div><p className="eyebrow">{t('groups', 'selectedGroup')}</p><h3>{selectedGroup.name}</h3></div>
                  <button type="button" className="learner-group-secondary-btn" onClick={() => handleEditGroup(selectedGroup)}>{t('groups', 'editGroup')}</button>
                </div>
                <p className="learner-group-description">{selectedGroup.description || t('groups', 'emptyDescription')}</p>
                <div className="learner-assignment-list">
                  <div className="learner-assignment-list-header"><h4>{t('groups', 'assignLearners')}</h4><span>{selectedGroup.learnerIds.length} {t('groups', 'selectedCount')}</span></div>
                  {learners.map((learner) => {
                    const isAssigned = selectedGroup.learnerIds.includes(learner.id)
                    return (
                      <label key={learner.id} className={`learner-assignment-row ${isAssigned ? 'checked' : ''}`}>
                        <input type="checkbox" checked={isAssigned} disabled={saving} onChange={() => handleToggleLearner(learner.id)} />
                        <span className="learner-name">{learner.name}</span>
                        <span className="learner-department">{learner.studentNumber || learner.email || ''}</span>
                      </label>
                    )
                  })}
                  {!loading && !learners.length && <p>No learners are available yet.</p>}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </AppLayout>
  )
}
