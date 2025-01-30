import { NextResponse } from 'next/server'

const API_BASE = 'http://localhost/skillswap-api/skill_matching.php'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action')
    const userId = searchParams.get('user_id')
    const teacherId = searchParams.get('teacher_id')
    const requestId = searchParams.get('request_id')

    let url = `${API_BASE}?action=${action}`
    if (userId) url += `&user_id=${userId}`
    if (teacherId) url += `&teacher_id=${teacherId}`
    if (requestId) url += `&request_id=${requestId}`

    const response = await fetch(url)
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in matching API:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action')
    const body = await request.json()

    const response = await fetch(`${API_BASE}?action=${action}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in matching API:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
