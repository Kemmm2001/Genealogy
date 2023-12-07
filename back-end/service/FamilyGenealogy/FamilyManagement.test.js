const db = require("../../Models/ConnectDB")
const CoreFunction = require("../../Utils/CoreFunction");
const MarriageManagement = require("./MarriageManagement");
const mysql2 = require('mysql2/promise');
const FamilyManagement = require('./FamilyManagement');

test('Update member photo with valid input', async () => {
    const memberPhotoUrl = 'https://example.com/photo.jpg';
    const memberId = 1563;
    
    const result = await FamilyManagement.updateMemberPhoto(memberPhotoUrl, memberId);
    // expected là cái affectRows trả về từ hàm updateMemberPhoto sẽ bằng 0, tức là không có dòng nào được update
    expect(result.affectedRows).toEqual(1); // Assert the result here
});

test('Update member photo with empty URL', async () => {
    const memberPhotoUrl = '';
    const memberId = 1563;
    
    const result = await FamilyManagement.updateMemberPhoto(memberPhotoUrl, memberId);
    
    expect(result.affectedRows).toEqual(1); // Assert the result here
});


test('Update member photo with non-existent member ID', async () => {
    const memberPhotoUrl = 'https://example.com/photo.jpg';
    const memberId = 789;
    
    const result = await FamilyManagement.updateMemberPhoto(memberPhotoUrl, memberId);
    
    expect(result.affectedRows).toEqual(0); // Assert the result here
});

describe('Update member photo with invalid member ID', () => {
  
  });

test('Update member photo with số âm member ID', async () => {
    const memberPhotoUrl = 'https://example.com/photo.jpg';
    const memberId = -123;
    
    const result = await FamilyManagement.updateMemberPhoto(memberPhotoUrl, memberId);
    
    expect(result.affectedRows).toEqual(0); // Assert the result here
});

