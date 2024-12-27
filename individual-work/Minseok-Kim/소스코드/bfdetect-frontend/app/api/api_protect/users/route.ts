import { NextResponse } from 'next/server';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { message } from 'antd';

// SQLite 데이터베이스를 열기 위한 함수
async function openDB() {
  return open({
    filename: 'prisma/dev.db', // dev.db의 실제 경로
    driver: sqlite3.Database,
  });
}

// GET 요청 핸들러
export async function GET() {
  try {
    const db = await openDB();

    // User 테이블에서 데이터 가져오기
    const users = await db.all('SELECT key_id AS key, id, name, regi_date FROM User');

    return NextResponse.json(users);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }
    const db = await openDB();

    await db.run('DELETE FROM User WHERE id = ?', id);
    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}
