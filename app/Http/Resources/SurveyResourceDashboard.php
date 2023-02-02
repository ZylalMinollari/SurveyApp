<?php

namespace App\Http\Resources;

use Illuminate\Support\Facades\URL;
use App\Http\Resources\SurveyQuestionResource;
use Illuminate\Http\Resources\Json\JsonResource;

class SurveyResourceDashboard extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'image_url' => $this->image ? URL::to($this->image) : null,
            'title' => $this->title,
            'slug' => $this->slug,
            'status' => !!$this->status,
            'expire_date' => (new \DateTime($this->expire_date))->format('Y-m-d H:i:s'),
            'created_at' => (new \DateTime($this->updated_at))->format('Y-m-d H:i:s'),
            'questions' => $this->questions()->count(),
            'answers' => $this->answers()->count()
        ];
    }
}
