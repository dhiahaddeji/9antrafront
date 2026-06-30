import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from 'src/app/MesServices/Groups/group.service';
import { UserService } from 'src/app/MesServices/UserService/user-service.service';
import { Groups } from 'src/app/Models/group.model';

@Component({
  selector: 'app-project-member',
  templateUrl: './project-member.component.html',
  styleUrls: ['./project-member.component.css']
})
export class ProjectMemberComponent implements OnInit{
  constructor(    
    private route: ActivatedRoute,

     private groupService: GroupService,   private router: Router, private userService: UserService,

  ){}
  groupMembers: any[] = [];

  studentDetails: any[] = [];
  ngOnInit(): void {
    
    const projectId = this.route.snapshot.params['id'];
    this.fetchGroupMembers(projectId);
  }
  studentsOfGroup!: any[];
  group!: Groups;

  fetchGroupMembers(groupId: number) {
    this.groupService.getGroupsById(groupId).subscribe(
      (group) => {
        this.group = group;
        if (group.etudiants) {
          this.studentsOfGroup = group.etudiants.map((etudiant) => etudiant.id);
          this.studentDetails = [];
          this.studentsOfGroup.forEach((studentId: number) => {
            this.userService.getUserById(studentId).subscribe(
              (student) => {
                console.log(student);
                this.studentDetails.push(student);
              },
              (error) => {
                console.error('Error retrieving student details:', error);
              }
            );
          });
         } });}
         showDetails(id: number) {
          this.router.navigate(['coach/project-member-details/table/project', id]);
        }}
      
