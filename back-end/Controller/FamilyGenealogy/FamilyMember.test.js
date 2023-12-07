const FamilyMember = require('./FamilyMember');


describe('addChild', () => {

    it('should add new member child', async () => {
      // Mock req, res
      const req = {
        "MemberName": "John Doe",
        "NickName": "Johnny",
        "Dod": "1980-05-24",
        "LunarDod": "2000-10-24",
        "BloodType": "A",
        "Origin": "New York",
        "Dob": "1980-05-24",
        "LunarDob": "1980-03-15",
        "BirthPlace": "New York Hospital",
        "IsDead": 1,
        "PlaceOfDeath": "Nam Dinh",
        "GraveSite": "Khong biet",
        "Note": "day la note",
        "CodeID": 571016,
        "Male": 0,
        "BirthOrder": 7,
        "FatherID": 1362
      //   "MotherID": 624
      }; 
      const res = {
        json: jest.fn()
      };
  
      // Call function  
      await FamilyMember.addChild(req, res);
  
      // Assertions 
      expect(res.json).toBeCalledWith({
        success: true   
      });
  
    });
  
  });