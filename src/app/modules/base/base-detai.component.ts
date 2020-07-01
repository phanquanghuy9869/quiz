import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailService } from 'src/app/services/base/detail.service';

export class BaseDetailComponent<TService extends DetailService, TModel> implements OnInit {
    protected isCreateMode = true;
    protected id: any;
    public model: TModel;

    constructor(private _service: TService, protected _route: ActivatedRoute) { }

    async ngOnInit(): Promise<void> {
        this.id = this._route.snapshot.params['id'];
        if (this.id) {
            this.isCreateMode = false;
            this.model = await this._service.get(this.id);
            console.log(this.model);
        }
    }

    async add() {
        try {
            await this._service.add(this.model);
            alert('Success');
        } catch (error) {
            if (error.status = 400) {
                alert(JSON.stringify(error.error.errors));
            } else {
                alert('Error');
            }
        }
    }

    async update() {
        try {
            await this._service.update(this.id, this.model);
        } catch (error) {
            alert('Error');
        }
    }

    async addOrUpdate() {
        const validate = this.validateModel();

        if (!validate.valid) {
            alert(validate.errors.join(', '));
            return;
        }

        if (this.isCreateMode) {
            this.add();
        } else {
            this.update();
        }
    }

    validateModel() {
        return { valid: true, errors: [] };
    }

    async delete() {
        try {
            await this._service.delete(this.model);
        } catch (error) {
            alert('Error');
        }
    }
}