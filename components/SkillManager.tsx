import { useState, useEffect } from 'react'
import { getAllSkills, createSkill } from '@/utils/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

interface Skill {
  _id: string;
  name: string;
  category: string;
  description: string;
}

export default function SkillManager() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [showAddSkillModal, setShowAddSkillModal] = useState(false)
  const [newSkill, setNewSkill] = useState({ name: '', category: '', description: '' })

  useEffect(() => {
    fetchSkills()
  }, [])

  const fetchSkills = async () => {
    try {
      const response = await getAllSkills()
      setSkills(response.data)
    } catch (error) {
      console.error('Failed to fetch skills:', error)
    }
  }

  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createSkill(newSkill)
      setShowAddSkillModal(false)
      setNewSkill({ name: '', category: '', description: '' })
      fetchSkills()
    } catch (error) {
      console.error('Failed to add skill:', error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Manage Skills</h2>
      <Button onClick={() => setShowAddSkillModal(true)} className="mb-4">Add New Skill</Button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((skill) => (
          <div key={skill._id} className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold">{skill.name}</h3>
            <p className="text-sm text-gray-600">{skill.category}</p>
            <p className="mt-2">{skill.description}</p>
          </div>
        ))}
      </div>

      <Dialog open={showAddSkillModal} onOpenChange={setShowAddSkillModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Skill</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddSkill} className="space-y-4">
            <Input
              type="text"
              placeholder="Skill Name"
              value={newSkill.name}
              onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
              required
            />
            <Input
              type="text"
              placeholder="Category"
              value={newSkill.category}
              onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
              required
            />
            <Input
              type="text"
              placeholder="Description"
              value={newSkill.description}
              onChange={(e) => setNewSkill({ ...newSkill, description: e.target.value })}
              required
            />
            <Button type="submit" className="w-full">Add Skill</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

